import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  CreditTxKind,
  Prisma,
  PurchaseStatus,
  type CreditPurchase,
} from 'generated/prisma';
import Stripe = require('stripe');
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import {
  type ChargeFigures,
  StripeService,
} from '@/integrations/stripe/stripe.service';
import { AppConfigKeys } from '@/modules/app-config/app-config.constants';
import { AppConfigService } from '@/modules/app-config/app-config.service';
import { CreditsService } from '@/modules/credits/credits.service';
import { CreditRatesService } from '@/modules/credits/services/credit-rates.service';
import { ErrorCodes } from '@/shared/config/error-codes';
import { ApiException } from '@/shared/errors/api-exception';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import type {
  AdminPurchasesQueryType,
  PurchasesQueryType,
} from './dto/purchases-query.schema';
import type {
  AdminPurchaseJson,
  AdminPurchasesResponse,
  CheckoutResponse,
  PurchaseFigures,
  PurchaseJson,
  PurchasesResponse,
  PurchasesSummary,
} from './interfaces/billing.interface';

/** Stripe's minimum charge for EUR. */
const MIN_AMOUNT_CENTS = 50;
/** Statuses where money was actually taken (shown to users, counted in admin totals). */
const SETTLED_STATUSES: PurchaseStatus[] = [
  PurchaseStatus.paid,
  PurchaseStatus.partially_refunded,
  PurchaseStatus.refunded,
];

/** Gross / fee / net in EUR and USD cents, plus the fee as % of the gross. Exported for unit tests. */
export function purchaseFigures(
  amountEurCents: number,
  feeEurCents: number | null,
  usdPerEur: number,
): PurchaseFigures {
  const amountUsd = Math.round(amountEurCents * usdPerEur);
  if (feeEurCents === null) {
    return {
      stripe_fee_eur_cents: null,
      net_eur_cents: null,
      stripe_fee_pct: null,
      usd_per_eur: usdPerEur,
      amount_usd_cents: amountUsd,
      stripe_fee_usd_cents: null,
      net_usd_cents: null,
    };
  }
  const feeUsd = Math.round(feeEurCents * usdPerEur);
  return {
    stripe_fee_eur_cents: feeEurCents,
    net_eur_cents: amountEurCents - feeEurCents,
    stripe_fee_pct:
      amountEurCents > 0
        ? Math.round((feeEurCents / amountEurCents) * 10000) / 100
        : 0,
    usd_per_eur: usdPerEur,
    amount_usd_cents: amountUsd,
    stripe_fee_usd_cents: feeUsd,
    net_usd_cents: amountUsd - feeUsd,
  };
}

/** Price of `credits` at `creditsPerEur`, in EUR cents. Exported for unit tests. */
export function priceCents(credits: number, creditsPerEur: number): number {
  return Math.round((credits / creditsPerEur) * 100);
}

@Injectable()
export class BillingService {
  private readonly logger = new Logger(BillingService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly stripe: StripeService,
    private readonly appConfig: AppConfigService,
    private readonly credits: CreditsService,
    private readonly rates: CreditRatesService,
  ) {}

  // ------------------------------------------------------------------ checkout

  async createCheckout(
    userId: string,
    dto: CreateCheckoutDto,
  ): Promise<CheckoutResponse> {
    if (!this.stripe.isConfigured()) {
      throw new ApiException(
        HttpStatus.SERVICE_UNAVAILABLE,
        ErrorCodes.PAYMENTS_UNAVAILABLE,
        'Payments are temporarily unavailable. Please try again later.',
      );
    }

    // Base rate or a better volume tier; stored on the purchase as credits_per_eur.
    const [creditsPerEur, maxCredits] = await Promise.all([
      this.rates.rateFor(dto.credits),
      this.appConfig.getNumber(AppConfigKeys.BILLING_MAX_CREDITS_PER_PURCHASE),
    ]);
    if (dto.credits > maxCredits) {
      throw new ApiException(
        HttpStatus.BAD_REQUEST,
        ErrorCodes.VALIDATION,
        `You can buy at most ${Math.floor(maxCredits)} credits at once.`,
      );
    }
    if (creditsPerEur <= 0) {
      throw new ApiException(
        HttpStatus.SERVICE_UNAVAILABLE,
        ErrorCodes.PAYMENTS_UNAVAILABLE,
        'Pricing is not configured.',
      );
    }
    const amountCents = priceCents(dto.credits, creditsPerEur);
    if (amountCents < MIN_AMOUNT_CENTS) {
      throw new ApiException(
        HttpStatus.BAD_REQUEST,
        ErrorCodes.VALIDATION,
        'The minimum purchase is €0.50.',
      );
    }

    const customerId = await this.getOrCreateCustomer(userId);
    const purchase = await this.prisma.creditPurchase.create({
      data: {
        user_id: userId,
        credits: dto.credits,
        videos_selected: dto.videos_selected ?? null,
        credits_per_eur: creditsPerEur,
        amount_eur_cents: amountCents,
      },
    });

    const appUrl = (
      this.config.get<string>('APP_URL') ?? 'http://localhost:3001'
    ).replace(/\/+$/, '');
    try {
      const session = await this.stripe.createCheckoutSession({
        purchaseId: purchase.id,
        customerId,
        credits: dto.credits,
        amountCents,
        successUrl: `${appUrl}/credits?status=success&purchase=${purchase.id}`,
        cancelUrl: `${appUrl}/credits?status=cancelled`,
      });
      await this.prisma.creditPurchase.update({
        where: { id: purchase.id },
        data: { stripe_checkout_session_id: session.id },
      });
      if (!session.url) throw new Error('Checkout session has no url');
      return { url: session.url, purchase_id: purchase.id };
    } catch (error) {
      this.logger.error(
        `Checkout for purchase ${purchase.id} failed: ${(error as Error).message}`,
      );
      await this.prisma.creditPurchase.update({
        where: { id: purchase.id },
        data: { status: PurchaseStatus.failed },
      });
      throw new ApiException(
        HttpStatus.BAD_GATEWAY,
        ErrorCodes.PAYMENTS_UNAVAILABLE,
        'Could not start the payment. Please try again.',
      );
    }
  }

  private async getOrCreateCustomer(userId: string): Promise<string> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, stripe_customer_id: true },
    });
    if (!user)
      throw new ApiException(
        HttpStatus.UNAUTHORIZED,
        ErrorCodes.UNAUTHORIZED,
        'Authentication required',
      );
    if (user.stripe_customer_id) return user.stripe_customer_id;

    const customerId = await this.stripe.createCustomer(user.email, userId);
    // Two concurrent checkouts may both create a customer; keep whichever was stored first.
    const stored = await this.prisma.user.updateMany({
      where: { id: userId, stripe_customer_id: null },
      data: { stripe_customer_id: customerId },
    });
    if (stored.count === 1) return customerId;
    const again = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { stripe_customer_id: true },
    });
    return again?.stripe_customer_id ?? customerId;
  }

  // ------------------------------------------------------------------ webhook

  async handleWebhook(
    rawBody: Buffer | undefined,
    signature: string | undefined,
  ): Promise<void> {
    if (!rawBody || !signature) {
      throw new ApiException(
        HttpStatus.BAD_REQUEST,
        ErrorCodes.VALIDATION,
        'Missing Stripe signature',
      );
    }
    let event: Stripe.Event;
    try {
      event = this.stripe.constructEvent(rawBody, signature);
    } catch (error) {
      if (error instanceof ApiException) throw error;
      throw new ApiException(
        HttpStatus.BAD_REQUEST,
        ErrorCodes.VALIDATION,
        'Invalid Stripe signature',
      );
    }

    switch (event.type) {
      case 'checkout.session.completed':
      case 'checkout.session.async_payment_succeeded': {
        const session = event.data.object;
        if (
          session.payment_status === 'paid' ||
          session.payment_status === 'no_payment_required'
        ) {
          await this.fulfil(session);
        }
        break;
      }
      case 'checkout.session.expired':
        await this.closePending(event.data.object, PurchaseStatus.expired);
        break;
      case 'checkout.session.async_payment_failed':
        await this.closePending(event.data.object, PurchaseStatus.failed);
        break;
      case 'charge.updated':
        await this.backfillFees(event.data.object);
        break;
      case 'charge.refunded':
        await this.refund(event.data.object);
        break;
      default:
        break;
    }
  }

  private purchaseIdOf(session: Stripe.Checkout.Session): string | null {
    return session.metadata?.purchase_id ?? session.client_reference_id ?? null;
  }

  /** Marks the purchase paid and adds the credits, exactly once (the status flip guards repeats). */
  private async fulfil(session: Stripe.Checkout.Session): Promise<void> {
    const purchaseId = this.purchaseIdOf(session);
    if (!purchaseId) return;
    const purchase = await this.prisma.creditPurchase.findUnique({
      where: { id: purchaseId },
    });
    if (!purchase || SETTLED_STATUSES.includes(purchase.status)) return;

    const intentId =
      typeof session.payment_intent === 'string'
        ? session.payment_intent
        : (session.payment_intent?.id ?? null);
    const figures = intentId
      ? await this.stripe.chargeFiguresForPaymentIntent(intentId)
      : null;
    const usdPerEur = await this.appConfig.getNumber(
      AppConfigKeys.BILLING_USD_PER_EUR,
    );
    const amountCents = session.amount_total ?? purchase.amount_eur_cents;

    await this.prisma.$transaction(async (tx) => {
      const flipped = await tx.creditPurchase.updateMany({
        where: {
          id: purchase.id,
          status: {
            in: [
              PurchaseStatus.pending,
              PurchaseStatus.expired,
              PurchaseStatus.failed,
            ],
          },
        },
        data: {
          status: PurchaseStatus.paid,
          paid_at: new Date(),
          amount_eur_cents: amountCents,
          stripe_checkout_session_id: session.id,
          stripe_payment_intent_id: intentId,
          ...this.chargeData(figures),
          ...purchaseFigures(amountCents, figures?.feeCents ?? null, usdPerEur),
        },
      });
      if (flipped.count === 0) return;
      await this.credits.apply(
        tx,
        purchase.user_id,
        purchase.credits,
        CreditTxKind.purchase,
        {
          purchaseId: purchase.id,
          note: `Bought ${purchase.credits} credits`,
        },
      );
    });
  }

  private chargeData(figures: ChargeFigures | null) {
    if (!figures) return {};
    return {
      stripe_charge_id: figures.chargeId,
      stripe_balance_transaction_id: figures.balanceTransactionId,
      payment_method_type: figures.paymentMethodType,
      card_brand: figures.cardBrand,
      card_country: figures.cardCountry,
      receipt_url: figures.receiptUrl,
    };
  }

  private async closePending(
    session: Stripe.Checkout.Session,
    status: PurchaseStatus,
  ): Promise<void> {
    const purchaseId = this.purchaseIdOf(session);
    if (!purchaseId) return;
    await this.prisma.creditPurchase.updateMany({
      where: { id: purchaseId, status: PurchaseStatus.pending },
      data: { status },
    });
  }

  private async findByCharge(
    charge: Stripe.Charge,
  ): Promise<CreditPurchase | null> {
    const intentId =
      typeof charge.payment_intent === 'string'
        ? charge.payment_intent
        : (charge.payment_intent?.id ?? null);
    return this.prisma.creditPurchase.findFirst({
      where: {
        OR: [
          { stripe_charge_id: charge.id },
          ...(intentId ? [{ stripe_payment_intent_id: intentId }] : []),
          ...(charge.metadata?.purchase_id
            ? [{ id: charge.metadata.purchase_id }]
            : []),
        ],
      },
    });
  }

  /** The balance transaction (and so the fee) can appear after checkout completed. */
  private async backfillFees(charge: Stripe.Charge): Promise<void> {
    if (!charge.balance_transaction) return;
    const purchase = await this.findByCharge(charge);
    if (
      !purchase ||
      purchase.stripe_fee_eur_cents !== null ||
      !SETTLED_STATUSES.includes(purchase.status)
    )
      return;

    const figures = await this.stripe.chargeFigures(charge.id);
    if (figures.feeCents === null) return;
    const usdPerEur =
      purchase.usd_per_eur ??
      (await this.appConfig.getNumber(AppConfigKeys.BILLING_USD_PER_EUR));
    await this.prisma.creditPurchase.update({
      where: { id: purchase.id },
      data: {
        ...this.chargeData(figures),
        ...purchaseFigures(
          purchase.amount_eur_cents,
          figures.feeCents,
          usdPerEur,
        ),
      },
    });
  }

  /** Refunds (full or partial) take back credits in proportion, never below a zero balance. */
  private async refund(charge: Stripe.Charge): Promise<void> {
    const purchase = await this.findByCharge(charge);
    if (!purchase || !SETTLED_STATUSES.includes(purchase.status)) return;

    const refundedCents = Math.min(
      charge.amount_refunded,
      purchase.amount_eur_cents,
    );
    const fullyRefunded = refundedCents >= purchase.amount_eur_cents;
    const targetCredits = fullyRefunded
      ? purchase.credits
      : Math.floor(
          (purchase.credits * refundedCents) / purchase.amount_eur_cents,
        );
    const toTake = targetCredits - purchase.refunded_credits;

    await this.prisma.$transaction(async (tx) => {
      // Optimistic guard: only one handler moves refunded_credits from the value read above.
      const updated = await tx.creditPurchase.updateMany({
        where: { id: purchase.id, refunded_credits: purchase.refunded_credits },
        data: {
          refunded_eur_cents: refundedCents,
          refunded_credits: Math.max(targetCredits, purchase.refunded_credits),
          status: fullyRefunded
            ? PurchaseStatus.refunded
            : PurchaseStatus.partially_refunded,
          refunded_at: new Date(),
        },
      });
      if (updated.count === 0 || toTake <= 0) return;
      await this.credits.apply(
        tx,
        purchase.user_id,
        -toTake,
        CreditTxKind.purchase_refund,
        {
          purchaseId: purchase.id,
          note: `Refund of €${(refundedCents / 100).toFixed(2)}`,
        },
        true,
      );
    });
  }

  // ------------------------------------------------------------------ lists

  async listForUser(
    userId: string,
    query: PurchasesQueryType,
  ): Promise<PurchasesResponse> {
    const where: Prisma.CreditPurchaseWhereInput = {
      user_id: userId,
      status: { in: SETTLED_STATUSES },
    };
    const [rows, total] = await Promise.all([
      this.prisma.creditPurchase.findMany({
        where,
        orderBy: { created_at: 'desc' },
        skip: (query.page - 1) * query.limit,
        take: query.limit,
      }),
      this.prisma.creditPurchase.count({ where }),
    ]);
    return {
      data: rows.map((r) => this.serialize(r)),
      pagination: this.paginate(total, query.page, query.limit),
    };
  }

  async listForAdmin(
    query: AdminPurchasesQueryType,
  ): Promise<AdminPurchasesResponse> {
    const where: Prisma.CreditPurchaseWhereInput = {
      ...(query.user_id ? { user_id: query.user_id } : {}),
      ...(query.status ? { status: query.status } : {}),
      ...(query.from || query.to
        ? {
            created_at: {
              ...(query.from ? { gte: new Date(query.from) } : {}),
              ...(query.to ? { lt: new Date(query.to) } : {}),
            },
          }
        : {}),
    };

    const [rows, total, summary] = await Promise.all([
      this.prisma.creditPurchase.findMany({
        where,
        orderBy: { created_at: 'desc' },
        skip: (query.page - 1) * query.limit,
        take: query.limit,
        include: { user: { select: { email: true } } },
      }),
      this.prisma.creditPurchase.count({ where }),
      this.summarize(where),
    ]);

    return {
      data: rows.map(
        (r): AdminPurchaseJson => ({
          ...this.serialize(r),
          user_id: r.user_id,
          user_email: r.user.email,
          credits_per_eur: r.credits_per_eur,
          stripe_fee_eur_cents: r.stripe_fee_eur_cents,
          net_eur_cents: r.net_eur_cents,
          stripe_fee_pct: r.stripe_fee_pct,
          usd_per_eur: r.usd_per_eur,
          amount_usd_cents: r.amount_usd_cents,
          stripe_fee_usd_cents: r.stripe_fee_usd_cents,
          net_usd_cents: r.net_usd_cents,
          refunded_credits: r.refunded_credits,
          stripe_checkout_session_id: r.stripe_checkout_session_id,
          stripe_payment_intent_id: r.stripe_payment_intent_id,
          stripe_charge_id: r.stripe_charge_id,
          payment_method_type: r.payment_method_type,
          card_brand: r.card_brand,
          card_country: r.card_country,
        }),
      ),
      pagination: this.paginate(total, query.page, query.limit),
      summary,
    };
  }

  /** Totals over settled purchases in the filtered set (pending/expired/failed took no money). */
  private async summarize(
    where: Prisma.CreditPurchaseWhereInput,
  ): Promise<PurchasesSummary> {
    const settledWhere: Prisma.CreditPurchaseWhereInput = {
      AND: [where, { status: { in: SETTLED_STATUSES } }],
    };
    const agg = await this.prisma.creditPurchase.aggregate({
      where: settledWhere,
      _count: { _all: true },
      _sum: {
        credits: true,
        refunded_credits: true,
        amount_eur_cents: true,
        stripe_fee_eur_cents: true,
        net_eur_cents: true,
        refunded_eur_cents: true,
        amount_usd_cents: true,
        stripe_fee_usd_cents: true,
        net_usd_cents: true,
      },
    });
    const s = agg._sum;
    const gross = s.amount_eur_cents ?? 0;
    const fees = s.stripe_fee_eur_cents ?? 0;
    return {
      purchases: agg._count._all,
      credits: s.credits ?? 0,
      refunded_credits: s.refunded_credits ?? 0,
      amount_eur_cents: gross,
      stripe_fee_eur_cents: fees,
      net_eur_cents: s.net_eur_cents ?? 0,
      refunded_eur_cents: s.refunded_eur_cents ?? 0,
      amount_usd_cents: s.amount_usd_cents ?? 0,
      stripe_fee_usd_cents: s.stripe_fee_usd_cents ?? 0,
      net_usd_cents: s.net_usd_cents ?? 0,
      avg_fee_pct: gross > 0 ? Math.round((fees / gross) * 10000) / 100 : 0,
    };
  }

  private serialize(r: CreditPurchase): PurchaseJson {
    return {
      id: r.id,
      status: r.status,
      credits: r.credits,
      videos_selected: r.videos_selected,
      currency: r.currency,
      amount_eur_cents: r.amount_eur_cents,
      refunded_eur_cents: r.refunded_eur_cents,
      receipt_url: r.receipt_url,
      paid_at: r.paid_at?.toISOString() ?? null,
      created_at: r.created_at.toISOString(),
    };
  }

  private paginate(total: number, page: number, limit: number) {
    const totalPages = Math.ceil(total / limit);
    return {
      total,
      page,
      limit,
      total_pages: totalPages,
      has_next: page < totalPages,
      has_prev: page > 1,
    };
  }
}
