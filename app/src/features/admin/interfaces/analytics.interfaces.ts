export const AnalyticsRanges = {
  DAYS_7: "7d",
  DAYS_30: "30d",
  DAYS_90: "90d",
  MONTHS_12: "12m",
  ALL: "all",
} as const;
export type AnalyticsRange = (typeof AnalyticsRanges)[keyof typeof AnalyticsRanges];

export type AnalyticsBucket = "day" | "week" | "month";

/** Money is in EUR cents. Provider costs are recorded in USD and converted at the current billing.usd_per_eur. */
export interface AnalyticsTotals {
  revenue_eur_cents: number;
  refunds_eur_cents: number;
  /** Real fees Stripe reported on each purchase. */
  stripe_fee_eur_cents: number;
  net_revenue_eur_cents: number;
  higgsfield_cost_eur_cents: number;
  apify_cost_eur_cents: number;
  dewatermark_cost_eur_cents: number;
  provider_cost_eur_cents: number;
  total_cost_eur_cents: number;
  profit_eur_cents: number;
  margin_pct: number | null;
  /** Share of provider cost computed from configured prices instead of provider-reported amounts. */
  estimated_cost_pct: number | null;
  purchases: number;
  paying_users: number;
  avg_purchase_eur_cents: number | null;
  arppu_eur_cents: number | null;
  users_total: number;
  users_new: number;
  videos_submitted: number;
  videos_completed: number;
  videos_failed: number;
  success_rate_pct: number | null;
  avg_images_per_video: number | null;
  avg_cost_per_video_eur_cents: number | null;
  avg_credits_per_video: number | null;
  credits_purchased: number;
  credits_spent: number;
  credits_granted: number;
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

export interface Analytics {
  range: AnalyticsRange;
  bucket: AnalyticsBucket;
  from: string;
  to: string;
  usd_per_eur: number;
  totals: AnalyticsTotals;
  series: AnalyticsPoint[];
}
