import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { randomUUID } from 'crypto';
import { EmailKinds } from '@/core/queues/queues.constants';
import { QueuesService } from '@/core/queues/queues.service';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { AuthTtl } from '@/shared/constants/auth.constants';
import { ErrorCodes } from '@/shared/config/error-codes';
import { ApiException } from '@/shared/errors/api-exception';
import { RateLimitService } from '@/shared/services/rate-limit/rate-limit.service';
import { UsageService } from '@/modules/usage/usage.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { TokenService } from './services/token.service';
import type { Me, RequestContext, SessionTokens } from './interfaces/auth.interface';

const LOGIN_IP_LIMIT = 10;
const LOGIN_IP_WINDOW_SECONDS = 60;
const LOGIN_ACCOUNT_LIMIT = 5;
const LOGIN_ACCOUNT_WINDOW_SECONDS = 15 * 60;
const RESEND_LIMIT = 3;
const RESEND_WINDOW_SECONDS = 60 * 60;
const FORGOT_LIMIT = 3;
const FORGOT_WINDOW_SECONDS = 60 * 60;
/** A just-rotated refresh token replayed within this window (parallel tabs) is not treated as theft. */
const REFRESH_REUSE_GRACE_MS = 10_000;

export const REGISTER_MESSAGE = 'If this email can be registered, we sent a verification link.';
const FORGOT_MESSAGE = 'If an account exists for this email, we sent a reset link.';

const ARGON_OPTIONS = { type: argon2.argon2id } as const;

@Injectable()
export class AuthService implements OnModuleInit {
  private readonly logger = new Logger(AuthService.name);
  private dummyHash: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly tokens: TokenService,
    private readonly usage: UsageService,
    private readonly queues: QueuesService,
    private readonly rateLimit: RateLimitService,
  ) {}

  async onModuleInit() {
    // Used to equalise timing when the account does not exist.
    this.dummyHash = await argon2.hash(randomUUID(), ARGON_OPTIONS);
  }

  // ---------------------------------------------------------------- register

  async register(dto: RegisterDto, ctx: RequestContext) {
    // Hash first so the response time does not reveal whether the email exists.
    const passwordHash = await argon2.hash(dto.password, ARGON_OPTIONS);

    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
      select: { id: true },
    });
    if (existing) {
      return { message: REGISTER_MESSAGE, session: null };
    }

    const quota = this.config.get<number>('DEFAULT_MONTHLY_QUOTA');

    let user: { id: string; role: string };
    try {
      user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password_hash: passwordHash,
          ...(quota !== undefined ? { monthly_video_quota: quota } : {}),
        },
        select: { id: true, role: true },
      });
    } catch (error) {
      if ((error as { code?: string }).code === 'P2002') {
        return { message: REGISTER_MESSAGE, session: null };
      }
      throw error;
    }

    await this.issueEmailVerification(user.id);
    const session = await this.createSession(user, ctx);

    return { message: REGISTER_MESSAGE, session };
  }

  // ------------------------------------------------------------------- login

  async login(dto: LoginDto, ctx: RequestContext) {
    const ipKey = `login:ip:${ctx.ip ?? 'unknown'}`;
    const accountKey = `login:acct:${this.tokens.hash(dto.email)}`;

    const ipHits = await this.rateLimit.hit(ipKey, LOGIN_IP_WINDOW_SECONDS);
    const accountFailures = await this.rateLimit.get(accountKey);
    if (ipHits > LOGIN_IP_LIMIT || accountFailures >= LOGIN_ACCOUNT_LIMIT) {
      throw new ApiException(
        HttpStatus.TOO_MANY_REQUESTS,
        ErrorCodes.TOO_MANY_ATTEMPTS,
        'Too many sign-in attempts. Please wait a few minutes and try again.',
      );
    }

    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    const valid = await argon2
      .verify(user?.password_hash ?? this.dummyHash, dto.password)
      .catch(() => false);

    if (!user || !valid) {
      await this.rateLimit.hit(accountKey, LOGIN_ACCOUNT_WINDOW_SECONDS);
      throw new ApiException(
        HttpStatus.UNAUTHORIZED,
        ErrorCodes.INVALID_CREDENTIALS,
        'Invalid email or password.',
      );
    }

    await this.rateLimit.reset(accountKey);
    const session = await this.createSession(user, ctx);
    return { user: await this.buildMe(user), session };
  }

  // ----------------------------------------------------------------- refresh

  async refresh(rawToken: string | undefined, ctx: RequestContext) {
    const invalid = () =>
      new ApiException(HttpStatus.UNAUTHORIZED, ErrorCodes.INVALID_REFRESH, 'Session expired. Please sign in again.');

    if (!rawToken) throw invalid();

    const record = await this.prisma.refreshToken.findUnique({
      where: { token_hash: this.tokens.hash(rawToken) },
      include: { user: true },
    });
    if (!record) throw invalid();

    const now = new Date();

    if (record.revoked_at) {
      // Re-use of a rotated token: revoke the whole family (theft detection).
      if (now.getTime() - record.revoked_at.getTime() > REFRESH_REUSE_GRACE_MS) {
        await this.prisma.refreshToken.updateMany({
          where: { family_id: record.family_id, revoked_at: null },
          data: { revoked_at: now },
        });
      }
      throw invalid();
    }
    if (record.expires_at <= now) throw invalid();

    const newRefresh = this.tokens.generateOpaqueToken();
    const rotated = await this.prisma.$transaction(async (tx) => {
      const claimed = await tx.refreshToken.updateMany({
        where: { id: record.id, revoked_at: null },
        data: { revoked_at: now },
      });
      if (claimed.count === 0) return false;

      await tx.refreshToken.create({
        data: {
          user_id: record.user_id,
          token_hash: this.tokens.hash(newRefresh),
          family_id: record.family_id,
          expires_at: new Date(now.getTime() + AuthTtl.REFRESH_SECONDS * 1000),
          user_agent: ctx.userAgent,
          ip: ctx.ip,
        },
      });
      return true;
    });
    if (!rotated) throw invalid();

    const session: SessionTokens = {
      accessToken: await this.tokens.signAccessToken(record.user),
      refreshToken: newRefresh,
      csrfToken: this.tokens.generateCsrfToken(),
    };
    return { user: await this.buildMe(record.user), session };
  }

  // ------------------------------------------------------------------ logout

  async logout(rawToken: string | undefined): Promise<void> {
    if (!rawToken) return;
    await this.prisma.refreshToken.updateMany({
      where: { token_hash: this.tokens.hash(rawToken), revoked_at: null },
      data: { revoked_at: new Date() },
    });
  }

  // ------------------------------------------------------------ verify email

  async verifyEmail(rawToken: string) {
    const record = await this.prisma.emailVerificationToken.findUnique({
      where: { token_hash: this.tokens.hash(rawToken) },
    });
    const now = new Date();

    if (!record || record.used_at || record.expires_at <= now) {
      throw new ApiException(
        HttpStatus.BAD_REQUEST,
        ErrorCodes.INVALID_TOKEN,
        'This verification link is invalid or has expired.',
      );
    }

    await this.prisma.$transaction(async (tx) => {
      const claimed = await tx.emailVerificationToken.updateMany({
        where: { id: record.id, used_at: null },
        data: { used_at: now },
      });
      if (claimed.count === 0) {
        throw new ApiException(
          HttpStatus.BAD_REQUEST,
          ErrorCodes.INVALID_TOKEN,
          'This verification link is invalid or has expired.',
        );
      }
      await tx.user.updateMany({
        where: { id: record.user_id, email_verified_at: null },
        data: { email_verified_at: now },
      });
    });

    return { message: 'Your email is verified.' };
  }

  async resendVerification(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email_verified_at: true },
    });
    if (!user) {
      throw new ApiException(HttpStatus.UNAUTHORIZED, ErrorCodes.UNAUTHORIZED, 'Authentication required');
    }
    if (user.email_verified_at) {
      return { message: 'Your email is already verified.' };
    }

    const hits = await this.rateLimit.hit(`resend-verify:${userId}`, RESEND_WINDOW_SECONDS);
    if (hits > RESEND_LIMIT) {
      throw new ApiException(
        HttpStatus.TOO_MANY_REQUESTS,
        ErrorCodes.TOO_MANY_REQUESTS,
        'Too many requests. Please try again in an hour.',
      );
    }

    await this.issueEmailVerification(userId);
    return { message: 'We sent a new verification link.' };
  }

  // ---------------------------------------------------------- password reset

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email }, select: { id: true } });

    if (user) {
      const hits = await this.rateLimit.hit(`forgot:${user.id}`, FORGOT_WINDOW_SECONDS);
      if (hits <= FORGOT_LIMIT) {
        try {
          const raw = this.tokens.generateOpaqueToken(32);
          const record = await this.prisma.$transaction(async (tx) => {
            await tx.passwordResetToken.deleteMany({ where: { user_id: user.id, used_at: null } });
            return tx.passwordResetToken.create({
              data: {
                user_id: user.id,
                token_hash: this.tokens.hash(raw),
                expires_at: new Date(Date.now() + AuthTtl.PASSWORD_RESET_SECONDS * 1000),
              },
            });
          });
          await this.enqueueEmail(EmailKinds.RESET_PASSWORD, user.id, raw, record.id);
        } catch (error) {
          this.logger.error(`Failed to create password reset: ${(error as Error).message}`);
        }
      }
    }

    return { message: FORGOT_MESSAGE };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const invalid = () =>
      new ApiException(
        HttpStatus.BAD_REQUEST,
        ErrorCodes.INVALID_TOKEN,
        'This reset link is invalid or has expired.',
      );

    const record = await this.prisma.passwordResetToken.findUnique({
      where: { token_hash: this.tokens.hash(dto.token) },
    });
    const now = new Date();
    if (!record || record.used_at || record.expires_at <= now) throw invalid();

    const passwordHash = await argon2.hash(dto.password, ARGON_OPTIONS);

    await this.prisma.$transaction(async (tx) => {
      const claimed = await tx.passwordResetToken.updateMany({
        where: { id: record.id, used_at: null },
        data: { used_at: now },
      });
      if (claimed.count === 0) throw invalid();

      await tx.user.update({ where: { id: record.user_id }, data: { password_hash: passwordHash } });
      await tx.refreshToken.updateMany({
        where: { user_id: record.user_id, revoked_at: null },
        data: { revoked_at: now },
      });
      await tx.passwordResetToken.deleteMany({
        where: { user_id: record.user_id, used_at: null },
      });
    });

    return { message: 'Your password was updated. Please sign in.' };
  }

  // ---------------------------------------------------------------------- me

  async me(userId: string): Promise<Me> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new ApiException(HttpStatus.UNAUTHORIZED, ErrorCodes.UNAUTHORIZED, 'Authentication required');
    }
    return this.buildMe(user);
  }

  // ----------------------------------------------------------------- helpers

  private async buildMe(user: {
    id: string;
    email: string;
    role: string;
    email_verified_at: Date | null;
    created_at: Date;
    monthly_video_quota: number;
  }): Promise<Me> {
    const quota = await this.usage.getQuota(user.id, user.monthly_video_quota);
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      email_verified: user.email_verified_at !== null,
      created_at: user.created_at.toISOString(),
      quota,
    };
  }

  private async createSession(
    user: { id: string; role: string },
    ctx: RequestContext,
  ): Promise<SessionTokens> {
    const refreshToken = this.tokens.generateOpaqueToken();
    await this.prisma.refreshToken.create({
      data: {
        user_id: user.id,
        token_hash: this.tokens.hash(refreshToken),
        family_id: randomUUID(),
        expires_at: new Date(Date.now() + AuthTtl.REFRESH_SECONDS * 1000),
        user_agent: ctx.userAgent,
        ip: ctx.ip,
      },
    });

    return {
      accessToken: await this.tokens.signAccessToken(user),
      refreshToken,
      csrfToken: this.tokens.generateCsrfToken(),
    };
  }

  private async issueEmailVerification(userId: string) {
    try {
      const raw = this.tokens.generateOpaqueToken(32);
      const record = await this.prisma.$transaction(async (tx) => {
        await tx.emailVerificationToken.deleteMany({ where: { user_id: userId, used_at: null } });
        return tx.emailVerificationToken.create({
          data: {
            user_id: userId,
            token_hash: this.tokens.hash(raw),
            expires_at: new Date(Date.now() + AuthTtl.EMAIL_VERIFICATION_SECONDS * 1000),
          },
        });
      });
      await this.enqueueEmail(EmailKinds.VERIFY_EMAIL, userId, raw, record.id);
    } catch (error) {
      // Never fail registration / resend because the email could not be queued.
      this.logger.error(`Failed to issue verification email: ${(error as Error).message}`);
    }
  }

  /** The raw token travels in the job payload only (Redis must stay private). Never logged. */
  private async enqueueEmail(
    kind: typeof EmailKinds.VERIFY_EMAIL | typeof EmailKinds.RESET_PASSWORD,
    userId: string,
    token: string,
    nonce: string,
  ) {
    await this.queues.enqueueEmail({ kind, userId, token }, nonce);
  }
}
