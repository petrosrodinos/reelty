import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import type { Request, Response } from 'express';
import { AuthCookies } from '@/shared/constants/auth.constants';
import { ClientIp, UserAgent } from '@/shared/decorators/client-ip.decorator';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { SessionlessAuth } from '@/shared/decorators/sessionless.decorator';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { AuthService } from './auth.service';
import { AuthCookiesService } from './services/auth-cookies.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { AuthUserEntity, MeEntity, MessageEntity } from './entities/auth-response.entity';

const perMinute = (limit: number) => ({ default: { limit, ttl: 60_000 } });

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cookies: AuthCookiesService,
  ) {}

  @Post('register')
  @SessionlessAuth()
  @Throttle(perMinute(10))
  @ApiOperation({ summary: 'Register (generic response, signs the new user in)' })
  @ApiResponse({ status: 201, type: MessageEntity })
  async register(
    @Body() dto: RegisterDto,
    @ClientIp() ip: string | null,
    @UserAgent() userAgent: string | null,
    @Res({ passthrough: true }) res: Response,
  ): Promise<MessageEntity> {
    const { message, session } = await this.authService.register(dto, { ip, userAgent });
    if (session) this.cookies.setSession(res, session);
    return { message };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @SessionlessAuth()
  @Throttle(perMinute(20))
  @ApiOperation({ summary: 'Sign in with email and password' })
  @ApiResponse({ status: 200, type: AuthUserEntity })
  @ApiResponse({ status: 401, description: 'invalid_credentials' })
  @ApiResponse({ status: 429, description: 'too_many_attempts' })
  async login(
    @Body() dto: LoginDto,
    @ClientIp() ip: string | null,
    @UserAgent() userAgent: string | null,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, session } = await this.authService.login(dto, { ip, userAgent });
    this.cookies.setSession(res, session);
    return { user };
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @SessionlessAuth()
  @ApiOperation({ summary: 'Revoke the refresh token and clear cookies' })
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<void> {
    await this.authService.logout(req.cookies?.[AuthCookies.REFRESH]);
    this.cookies.clearSession(res);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @SessionlessAuth()
  @Throttle(perMinute(30))
  @ApiOperation({ summary: 'Rotate the refresh token and issue a new access token' })
  @ApiResponse({ status: 200, type: AuthUserEntity })
  @ApiResponse({ status: 401, description: 'invalid_refresh' })
  async refresh(
    @Req() req: Request,
    @ClientIp() ip: string | null,
    @UserAgent() userAgent: string | null,
    @Res({ passthrough: true }) res: Response,
  ) {
    // Cookies are intentionally not cleared on failure: a parallel tab may have just rotated them.
    const { user, session } = await this.authService.refresh(req.cookies?.[AuthCookies.REFRESH], {
      ip,
      userAgent,
    });
    this.cookies.setSession(res, session);
    return { user };
  }

  @Post('verify-email')
  @HttpCode(HttpStatus.OK)
  @SessionlessAuth()
  @Throttle(perMinute(10))
  @ApiOperation({ summary: 'Confirm an email address with the emailed token' })
  @ApiResponse({ status: 200, type: MessageEntity })
  @ApiResponse({ status: 400, description: 'invalid_token' })
  verifyEmail(@Body() dto: VerifyEmailDto) {
    return this.authService.verifyEmail(dto.token);
  }

  @Post('resend-verification')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  @ApiCookieAuth('reelty_at')
  @ApiOperation({ summary: 'Send a new verification email (3 per hour)' })
  @ApiResponse({ status: 200, type: MessageEntity })
  resendVerification(@CurrentUser('id') userId: string) {
    return this.authService.resendVerification(userId);
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @SessionlessAuth()
  @Throttle(perMinute(5))
  @ApiOperation({ summary: 'Request a password reset link (always generic)' })
  @ApiResponse({ status: 200, type: MessageEntity })
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto.email);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @SessionlessAuth()
  @Throttle(perMinute(10))
  @ApiOperation({ summary: 'Set a new password with a one-time token' })
  @ApiResponse({ status: 200, type: MessageEntity })
  @ApiResponse({ status: 400, description: 'invalid_token' })
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }

  @Get('me')
  @UseGuards(JwtGuard)
  @ApiCookieAuth('reelty_at')
  @ApiOperation({ summary: 'Current user with credit balance' })
  @ApiResponse({ status: 200, type: MeEntity })
  me(@CurrentUser('id') userId: string) {
    return this.authService.me(userId);
  }
}
