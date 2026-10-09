import { ApiProperty } from '@nestjs/swagger';
import { AnalyticsRanges } from '../dto/analytics-query.schema';

const nullableNumber = { nullable: true, type: Number } as const;

export class AnalyticsTotalsEntity {
  @ApiProperty({ description: 'Gross on settled purchases paid in the window' })
  revenue_eur_cents: number;
  @ApiProperty() refunds_eur_cents: number;
  @ApiProperty({ description: 'Real fees reported by Stripe' })
  stripe_fee_eur_cents: number;
  @ApiProperty() net_revenue_eur_cents: number;
  @ApiProperty() higgsfield_cost_eur_cents: number;
  @ApiProperty() apify_cost_eur_cents: number;
  @ApiProperty() dewatermark_cost_eur_cents: number;
  @ApiProperty() provider_cost_eur_cents: number;
  @ApiProperty() total_cost_eur_cents: number;
  @ApiProperty() profit_eur_cents: number;
  @ApiProperty(nullableNumber) margin_pct: number | null;
  @ApiProperty(nullableNumber) estimated_cost_pct: number | null;
  @ApiProperty() purchases: number;
  @ApiProperty() paying_users: number;
  @ApiProperty(nullableNumber) avg_purchase_eur_cents: number | null;
  @ApiProperty(nullableNumber) arppu_eur_cents: number | null;
  @ApiProperty() users_total: number;
  @ApiProperty() users_new: number;
  @ApiProperty() videos_submitted: number;
  @ApiProperty() videos_completed: number;
  @ApiProperty() videos_failed: number;
  @ApiProperty(nullableNumber) success_rate_pct: number | null;
  @ApiProperty(nullableNumber) avg_images_per_video: number | null;
  @ApiProperty(nullableNumber) avg_cost_per_video_eur_cents: number | null;
  @ApiProperty(nullableNumber) avg_credits_per_video: number | null;
  @ApiProperty() credits_purchased: number;
  @ApiProperty() credits_spent: number;
  @ApiProperty() credits_granted: number;
  @ApiProperty({ description: "All users' current balance" })
  credits_outstanding: number;
}

export class AnalyticsPointEntity {
  @ApiProperty({ example: '2026-10-01', description: 'Bucket start (UTC)' })
  period: string;
  @ApiProperty() revenue_eur_cents: number;
  @ApiProperty() refunds_eur_cents: number;
  @ApiProperty() stripe_fee_eur_cents: number;
  @ApiProperty() higgsfield_cost_eur_cents: number;
  @ApiProperty() apify_cost_eur_cents: number;
  @ApiProperty() dewatermark_cost_eur_cents: number;
  @ApiProperty() profit_eur_cents: number;
  @ApiProperty() new_users: number;
  @ApiProperty() videos_completed: number;
  @ApiProperty() videos_failed: number;
  @ApiProperty(nullableNumber) avg_images_per_video: number | null;
  @ApiProperty(nullableNumber) avg_cost_per_video_eur_cents: number | null;
}

export class AnalyticsEntity {
  @ApiProperty({ enum: AnalyticsRanges }) range: string;
  @ApiProperty({ enum: ['day', 'week', 'month'] }) bucket: string;
  @ApiProperty() from: string;
  @ApiProperty() to: string;
  @ApiProperty({ description: 'FX used to convert provider USD costs' })
  usd_per_eur: number;
  @ApiProperty({ type: AnalyticsTotalsEntity }) totals: AnalyticsTotalsEntity;
  @ApiProperty({ type: [AnalyticsPointEntity] })
  series: AnalyticsPointEntity[];
}
