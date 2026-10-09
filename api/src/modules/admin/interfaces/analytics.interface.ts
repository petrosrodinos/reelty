import type { AnalyticsRange } from '../dto/analytics-query.schema';

export type AnalyticsBucket = 'day' | 'week' | 'month';

/** Money is in EUR cents. Provider costs are recorded in USD and converted at the current billing.usd_per_eur. */
export interface AnalyticsTotals {
  /** Gross charged on settled purchases paid in the window. */
  revenue_eur_cents: number;
  refunds_eur_cents: number;
  /** Real fees Stripe reported on those purchases (balance transactions). */
  stripe_fee_eur_cents: number;
  /** Revenue - refunds - Stripe fees. */
  net_revenue_eur_cents: number;
  higgsfield_cost_eur_cents: number;
  apify_cost_eur_cents: number;
  dewatermark_cost_eur_cents: number;
  /** Higgsfield + Apify + dewatermark. */
  provider_cost_eur_cents: number;
  /** Stripe fees + provider costs. */
  total_cost_eur_cents: number;
  /** Revenue - refunds - all costs. */
  profit_eur_cents: number;
  /** Profit as % of revenue; null without revenue. */
  margin_pct: number | null;
  /** Share of provider cost computed from configured prices instead of provider-reported amounts. */
  estimated_cost_pct: number | null;

  purchases: number;
  paying_users: number;
  avg_purchase_eur_cents: number | null;
  /** Revenue per paying user. */
  arppu_eur_cents: number | null;

  users_total: number;
  users_new: number;

  videos_submitted: number;
  videos_completed: number;
  videos_failed: number;
  /** Completed / (completed + failed), as %. */
  success_rate_pct: number | null;
  avg_images_per_video: number | null;
  /** Provider cost / completed videos (failed renders' cost is carried by the ones that succeed). */
  avg_cost_per_video_eur_cents: number | null;
  avg_credits_per_video: number | null;

  credits_purchased: number;
  credits_spent: number;
  /** Signup grants and positive admin adjustments. */
  credits_granted: number;
  /** All users' current balance (not limited to the window). */
  credits_outstanding: number;
}

export interface AnalyticsPoint {
  /** Bucket start, YYYY-MM-DD (UTC). */
  period: string;
  revenue_eur_cents: number;
  refunds_eur_cents: number;
  stripe_fee_eur_cents: number;
  higgsfield_cost_eur_cents: number;
  apify_cost_eur_cents: number;
  dewatermark_cost_eur_cents: number;
  profit_eur_cents: number;
  new_users: number;
  videos_completed: number;
  videos_failed: number;
  avg_images_per_video: number | null;
  avg_cost_per_video_eur_cents: number | null;
}

export interface AnalyticsResponse {
  range: AnalyticsRange;
  bucket: AnalyticsBucket;
  /** Window start (inclusive) and end (exclusive), ISO. */
  from: string;
  to: string;
  usd_per_eur: number;
  totals: AnalyticsTotals;
  series: AnalyticsPoint[];
}
