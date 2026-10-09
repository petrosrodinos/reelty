import { HttpStatus, Injectable } from '@nestjs/common';
import {
  CreditTxKind,
  Prisma,
  SourceType,
  WatermarkStatus,
} from 'generated/prisma';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { StripeService } from '@/integrations/stripe/stripe.service';
import { AppConfigKeys } from '@/modules/app-config/app-config.constants';
import { AppConfigService } from '@/modules/app-config/app-config.service';
import { ErrorCodes } from '@/shared/config/error-codes';
import { ApiException } from '@/shared/errors/api-exception';
import { CreditRatesService } from './services/credit-rates.service';
import { CreditTiersService } from './services/credit-tiers.service';
import type { CreditTransactionsQueryType } from './dto/credit-transactions-query.schema';
import type {
  CreditsOverview,
  CreditsPricing,
  CreditTransactionsResponse,
  CreditTxKindValue,
  ProjectQuote,
  VideoQuote,
} from './interfaces/credits.interface';

type Db = Prisma.TransactionClient | PrismaService;

export interface CreditRefs {
  projectId?: string | null;
  purchaseId?: string | null;
  note?: string | null;
}

export interface QuoteInput {
  clips: number;
  dewatermarked: boolean;
  sourceType: SourceType;
}

/** Ready, non-removed photos: the ones a render uses. */
const READY_IMAGES = { removed: false, ready: true } as const;

@Injectable()
export class CreditsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly appConfig: AppConfigService,
    private readonly tiers: CreditTiersService,
    private readonly rates: CreditRatesService,
    private readonly stripe: StripeService,
  ) {}

  // ------------------------------------------------------------------ balance

  async getBalance(userId: string, db: Db = this.prisma): Promise<number> {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { credit_balance: true },
    });
    return user?.credit_balance ?? 0;
  }

  /**
   * Changes the balance by `delta` and records it, atomically. Debits that would take the balance
   * below 0 throw 402 insufficient_credits, unless `clampAtZero` (purchase refunds), where only what
   * is left is taken. Returns the credits actually applied. Call inside the caller's transaction.
   */
  async apply(
    db: Db,
    userId: string,
    delta: number,
    kind: CreditTxKind,
    refs: CreditRefs = {},
    clampAtZero = false,
  ): Promise<number> {
    if (!Number.isInteger(delta) || delta === 0) return 0;

    const rows = clampAtZero
      ? await db.$queryRaw<{ before: number; after: number }[]>`
          WITH old AS (SELECT credit_balance FROM "users" WHERE id = ${userId} FOR UPDATE)
          UPDATE "users" u SET credit_balance = GREATEST(u.credit_balance + ${delta}, 0), updated_at = NOW()
          FROM old WHERE u.id = ${userId}
          RETURNING old.credit_balance AS before, u.credit_balance AS after`
      : await db.$queryRaw<{ before: number; after: number }[]>`
          UPDATE "users" SET credit_balance = credit_balance + ${delta}, updated_at = NOW()
          WHERE id = ${userId} AND credit_balance + ${delta} >= 0
          RETURNING credit_balance - ${delta} AS before, credit_balance AS after`;

    if (!rows.length) {
      throw new ApiException(
        HttpStatus.PAYMENT_REQUIRED,
        ErrorCodes.INSUFFICIENT_CREDITS,
        'You do not have enough credits for this video.',
      );
    }
    const applied = Number(rows[0].after) - Number(rows[0].before);
    if (applied === 0) return 0;

    await db.creditTransaction.create({
      data: {
        user_id: userId,
        kind,
        credits: applied,
        balance_after: Number(rows[0].after),
        project_id: refs.projectId ?? null,
        purchase_id: refs.purchaseId ?? null,
        note: refs.note ?? null,
      },
    });
    return applied;
  }

  /** Throws 402 early (outside the charge transaction) so the user gets a clear message. */
  async assertAffordable(userId: string, credits: number): Promise<void> {
    const balance = await this.getBalance(userId);
    if (balance < credits) {
      throw new ApiException(
        HttpStatus.PAYMENT_REQUIRED,
        ErrorCodes.INSUFFICIENT_CREDITS,
        `This video costs ${credits} credits and you have ${balance}. Buy more credits to continue.`,
        { required: credits, balance },
      );
    }
  }

  // ------------------------------------------------------------------ pricing

  async quote(input: QuoteInput, db: Db = this.prisma): Promise<VideoQuote> {
    const [tier, watermark, importFetch] = await Promise.all([
      this.tiers.tierFor(input.clips, db),
      this.appConfig.getNumber(AppConfigKeys.CREDITS_WATERMARK_REMOVAL),
      this.appConfig.getNumber(AppConfigKeys.CREDITS_IMPORT_FETCH),
    ]);

    const addons: VideoQuote['addons'] = [];
    if (input.dewatermarked && watermark > 0)
      addons.push({ key: 'watermark_removal', credits: Math.round(watermark) });
    if (input.sourceType !== SourceType.upload && importFetch > 0) {
      addons.push({ key: 'import_fetch', credits: Math.round(importFetch) });
    }

    return {
      clips: input.clips,
      tier: {
        id: tier.id,
        name: tier.name,
        min_clips: tier.min_clips,
        max_clips: tier.max_clips,
        credits: tier.credits,
      },
      addons,
      total: tier.credits + addons.reduce((n, a) => n + a.credits, 0),
    };
  }

  /** Quote from the project's current photos. */
  async quoteProject(
    projectId: string,
    sourceType: SourceType,
    db: Db = this.prisma,
  ): Promise<VideoQuote> {
    const images = await db.image.findMany({
      where: { project_id: projectId, ...READY_IMAGES },
      select: { wm_status: true },
    });
    return this.quote(
      {
        clips: images.length,
        dewatermarked: images.some((i) => i.wm_status === WatermarkStatus.done),
        sourceType,
      },
      db,
    );
  }

  /** Price shown on the edit page before submit. Clip counts outside the tier range are clamped. */
  async quoteForUser(userId: string, projectId: string): Promise<ProjectQuote> {
    const project = await this.prisma.project.findFirst({
      where: { id: projectId, user_id: userId, deleted_at: null },
      select: { id: true, source_type: true },
    });
    if (!project)
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        ErrorCodes.NOT_FOUND,
        'Not found',
      );

    const images = await this.prisma.image.findMany({
      where: { project_id: projectId, ...READY_IMAGES },
      select: { wm_status: true },
    });
    const tiers = await this.tiers.list();
    const min = tiers[0]?.min_clips ?? 0;
    const max = tiers[tiers.length - 1]?.max_clips ?? 0;
    const clips = Math.min(Math.max(images.length, min), max);

    const [quote, balance] = await Promise.all([
      this.quote({
        clips,
        dewatermarked: images.some((i) => i.wm_status === WatermarkStatus.done),
        sourceType: project.source_type,
      }),
      this.getBalance(userId),
    ]);
    return {
      ...quote,
      clips: images.length,
      balance,
      affordable: balance >= quote.total,
    };
  }

  async getPricing(): Promise<CreditsPricing> {
    const [
      creditsPerEur,
      maxCredits,
      signup,
      watermark,
      importFetch,
      tiers,
      rateTiers,
    ] = await Promise.all([
      this.appConfig.getNumber(AppConfigKeys.BILLING_CREDITS_PER_EUR),
      this.appConfig.getNumber(AppConfigKeys.BILLING_MAX_CREDITS_PER_PURCHASE),
      this.appConfig.getNumber(AppConfigKeys.CREDITS_SIGNUP_GRANT),
      this.appConfig.getNumber(AppConfigKeys.CREDITS_WATERMARK_REMOVAL),
      this.appConfig.getNumber(AppConfigKeys.CREDITS_IMPORT_FETCH),
      this.tiers.listJson(),
      this.rates.listJson(),
    ]);
    return {
      credits_per_eur: creditsPerEur,
      rate_tiers: rateTiers,
      max_credits_per_purchase: Math.floor(maxCredits),
      signup_grant: Math.floor(signup),
      addons: {
        watermark_removal: Math.round(watermark),
        import_fetch: Math.round(importFetch),
      },
      tiers,
      payments_enabled: this.stripe.isConfigured(),
    };
  }

  async getOverview(userId: string): Promise<CreditsOverview> {
    const [balance, pricing] = await Promise.all([
      this.getBalance(userId),
      this.getPricing(),
    ]);
    return { balance, pricing };
  }

  async signupGrant(): Promise<number> {
    return Math.max(
      0,
      Math.floor(
        await this.appConfig.getNumber(AppConfigKeys.CREDITS_SIGNUP_GRANT),
      ),
    );
  }

  // ------------------------------------------------------------------ history

  async listTransactions(
    userId: string,
    query: CreditTransactionsQueryType,
  ): Promise<CreditTransactionsResponse> {
    const where: Prisma.CreditTransactionWhereInput = {
      user_id: userId,
      ...(query.kind ? { kind: query.kind } : {}),
    };
    const [rows, total] = await Promise.all([
      this.prisma.creditTransaction.findMany({
        where,
        orderBy: { created_at: 'desc' },
        skip: (query.page - 1) * query.limit,
        take: query.limit,
        include: { project: { select: { title: true } } },
      }),
      this.prisma.creditTransaction.count({ where }),
    ]);
    const totalPages = Math.ceil(total / query.limit);
    return {
      data: rows.map((row) => ({
        id: row.id,
        kind: row.kind as CreditTxKindValue,
        credits: row.credits,
        balance_after: row.balance_after,
        project_id: row.project_id,
        project_title: row.project?.title ?? null,
        purchase_id: row.purchase_id,
        note: row.note,
        created_at: row.created_at.toISOString(),
      })),
      pagination: {
        total,
        page: query.page,
        limit: query.limit,
        total_pages: totalPages,
        has_next: query.page < totalPages,
        has_prev: query.page > 1,
      },
    };
  }
}
