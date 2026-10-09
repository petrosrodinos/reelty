import { Injectable } from '@nestjs/common';
import {
  CreditTxKind,
  LedgerKind,
  ProjectStatus,
  PurchaseStatus,
} from 'generated/prisma';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { AppConfigKeys } from '@/modules/app-config/app-config.constants';
import { AppConfigService } from '@/modules/app-config/app-config.service';
import type { AnalyticsQueryType } from '../dto/analytics-query.schema';
import type {
  AnalyticsPoint,
  AnalyticsResponse,
} from '../interfaces/analytics.interface';
import {
  analyticsWindow,
  bucketKey,
  bucketKeys,
  percent,
  ratio,
} from '../utils/analytics.utils';

/** Purchases where money was actually taken. */
const SETTLED_STATUSES: PurchaseStatus[] = [
  PurchaseStatus.paid,
  PurchaseStatus.partially_refunded,
  PurchaseStatus.refunded,
];

/** Ledger kinds that carry a provider cost. */
const COST_KINDS: LedgerKind[] = [
  LedgerKind.higgsfield,
  LedgerKind.scrape,
  LedgerKind.dewatermark,
];

/** Running sums for one bucket; money in (fractional) EUR cents until the response is built. */
interface Acc {
  revenue: number;
  refunds: number;
  stripeFee: number;
  higgsfield: number;
  apify: number;
  dewatermark: number;
  newUsers: number;
  completed: number;
  failed: number;
  images: number;
}

const emptyAcc = (): Acc => ({
  revenue: 0,
  refunds: 0,
  stripeFee: 0,
  higgsfield: 0,
  apify: 0,
  dewatermark: 0,
  newUsers: 0,
  completed: 0,
  failed: 0,
  images: 0,
});

const providerCost = (a: Acc) => a.higgsfield + a.apify + a.dewatermark;
const profit = (a: Acc) =>
  a.revenue - a.refunds - a.stripeFee - providerCost(a);

/**
 * Business overview for the admin dashboard: revenue and real Stripe fees from purchases, provider costs
 * from the usage ledger, and user / video activity, as totals and a time series over one window.
 * Rows are read and bucketed in memory; fine at the current scale, move to SQL date_trunc if it grows.
 */
@Injectable()
export class AnalyticsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly appConfig: AppConfigService,
  ) {}

  async getAnalytics(query: AnalyticsQueryType): Promise<AnalyticsResponse> {
    const [usdPerEur, firstUser] = await Promise.all([
      this.appConfig.getNumber(AppConfigKeys.BILLING_USD_PER_EUR),
      this.prisma.user.findFirst({
        orderBy: { created_at: 'asc' },
        select: { created_at: true },
      }),
    ]);
    const { from, to, bucket } = analyticsWindow(
      query.range,
      new Date(),
      firstUser?.created_at ?? null,
    );
    const inWindow = { gte: from, lt: to };
    const usdToEurCents = (usd: number) =>
      usdPerEur > 0 ? (usd / usdPerEur) * 100 : 0;

    const [
      purchases,
      refunds,
      ledger,
      newUsers,
      usersTotal,
      balances,
      projects,
      creditsByKind,
      adminGrants,
    ] = await Promise.all([
      this.prisma.creditPurchase.findMany({
        where: { status: { in: SETTLED_STATUSES }, paid_at: inWindow },
        select: {
          user_id: true,
          paid_at: true,
          amount_eur_cents: true,
          stripe_fee_eur_cents: true,
        },
      }),
      this.prisma.creditPurchase.findMany({
        where: { refunded_at: inWindow, refunded_eur_cents: { gt: 0 } },
        select: { refunded_at: true, refunded_eur_cents: true },
      }),
      this.prisma.usageLedger.findMany({
        where: { created_at: inWindow, kind: { in: COST_KINDS } },
        select: {
          created_at: true,
          kind: true,
          cost_usd: true,
          cost_estimated: true,
        },
      }),
      this.prisma.user.findMany({
        where: { created_at: inWindow },
        select: { created_at: true },
      }),
      this.prisma.user.count(),
      this.prisma.user.aggregate({ _sum: { credit_balance: true } }),
      this.prisma.project.findMany({
        where: {
          OR: [{ submitted_at: inWindow }, { completed_at: inWindow }],
        },
        select: {
          status: true,
          submitted_at: true,
          completed_at: true,
          clips_done: true,
          credits_charged: true,
        },
      }),
      this.prisma.creditTransaction.groupBy({
        by: ['kind'],
        where: { created_at: inWindow },
        _sum: { credits: true },
      }),
      this.prisma.creditTransaction.aggregate({
        where: {
          created_at: inWindow,
          kind: CreditTxKind.admin_adjustment,
          credits: { gt: 0 },
        },
        _sum: { credits: true },
      }),
    ]);

    const buckets = new Map(
      bucketKeys(from, to, bucket).map((key) => [key, emptyAcc()]),
    );
    const total = emptyAcc();
    // Adds to the bucket of `date` and to the window total.
    const add = (date: Date, apply: (a: Acc) => void) => {
      const acc = buckets.get(bucketKey(date, bucket));
      if (acc) apply(acc);
      apply(total);
    };

    for (const p of purchases) {
      if (!p.paid_at) continue;
      add(p.paid_at, (a) => {
        a.revenue += p.amount_eur_cents;
        a.stripeFee += p.stripe_fee_eur_cents ?? 0;
      });
    }
    for (const r of refunds) {
      if (r.refunded_at)
        add(r.refunded_at, (a) => (a.refunds += r.refunded_eur_cents));
    }

    let estimatedCost = 0;
    for (const row of ledger) {
      const cents = usdToEurCents(row.cost_usd ?? 0);
      if (row.cost_estimated) estimatedCost += cents;
      add(row.created_at, (a) => {
        if (row.kind === LedgerKind.higgsfield) a.higgsfield += cents;
        else if (row.kind === LedgerKind.scrape) a.apify += cents;
        else a.dewatermark += cents;
      });
    }

    for (const u of newUsers) add(u.created_at, (a) => (a.newUsers += 1));

    let videosSubmitted = 0;
    let creditsOnCompleted = 0;
    for (const p of projects) {
      const submittedInWindow =
        !!p.submitted_at && p.submitted_at >= from && p.submitted_at < to;
      if (submittedInWindow) videosSubmitted += 1;
      if (
        p.status === ProjectStatus.COMPLETED &&
        p.completed_at &&
        p.completed_at >= from &&
        p.completed_at < to
      ) {
        creditsOnCompleted += p.credits_charged;
        add(p.completed_at, (a) => {
          a.completed += 1;
          a.images += p.clips_done;
        });
      } else if (p.status === ProjectStatus.FAILED && submittedInWindow) {
        add(p.submitted_at as Date, (a) => (a.failed += 1));
      }
    }

    const creditSum = (kind: CreditTxKind) =>
      creditsByKind.find((row) => row.kind === kind)?._sum.credits ?? 0;
    const payingUsers = new Set(purchases.map((p) => p.user_id)).size;
    const round = Math.round;

    const series: AnalyticsPoint[] = [...buckets].map(([period, a]) => ({
      period,
      revenue_eur_cents: round(a.revenue),
      refunds_eur_cents: round(a.refunds),
      stripe_fee_eur_cents: round(a.stripeFee),
      higgsfield_cost_eur_cents: round(a.higgsfield),
      apify_cost_eur_cents: round(a.apify),
      dewatermark_cost_eur_cents: round(a.dewatermark),
      profit_eur_cents: round(profit(a)),
      new_users: a.newUsers,
      videos_completed: a.completed,
      videos_failed: a.failed,
      avg_images_per_video: ratio(a.images, a.completed),
      avg_cost_per_video_eur_cents:
        a.completed > 0 ? round(providerCost(a) / a.completed) : null,
    }));

    const provider = providerCost(total);
    return {
      range: query.range,
      bucket,
      from: from.toISOString(),
      to: to.toISOString(),
      usd_per_eur: usdPerEur,
      totals: {
        revenue_eur_cents: round(total.revenue),
        refunds_eur_cents: round(total.refunds),
        stripe_fee_eur_cents: round(total.stripeFee),
        net_revenue_eur_cents: round(
          total.revenue - total.refunds - total.stripeFee,
        ),
        higgsfield_cost_eur_cents: round(total.higgsfield),
        apify_cost_eur_cents: round(total.apify),
        dewatermark_cost_eur_cents: round(total.dewatermark),
        provider_cost_eur_cents: round(provider),
        total_cost_eur_cents: round(total.stripeFee + provider),
        profit_eur_cents: round(profit(total)),
        margin_pct: percent(profit(total), total.revenue),
        estimated_cost_pct: percent(estimatedCost, provider),

        purchases: purchases.length,
        paying_users: payingUsers,
        avg_purchase_eur_cents:
          purchases.length > 0 ? round(total.revenue / purchases.length) : null,
        arppu_eur_cents:
          payingUsers > 0 ? round(total.revenue / payingUsers) : null,

        users_total: usersTotal,
        users_new: total.newUsers,

        videos_submitted: videosSubmitted,
        videos_completed: total.completed,
        videos_failed: total.failed,
        success_rate_pct: percent(
          total.completed,
          total.completed + total.failed,
        ),
        avg_images_per_video: ratio(total.images, total.completed),
        avg_cost_per_video_eur_cents:
          total.completed > 0 ? round(provider / total.completed) : null,
        avg_credits_per_video: ratio(creditsOnCompleted, total.completed),

        credits_purchased: creditSum(CreditTxKind.purchase),
        credits_spent: -(
          creditSum(CreditTxKind.video_charge) +
          creditSum(CreditTxKind.video_refund)
        ),
        credits_granted:
          creditSum(CreditTxKind.signup_grant) +
          (adminGrants._sum.credits ?? 0),
        credits_outstanding: balances._sum.credit_balance ?? 0,
      },
      series,
    };
  }
}
