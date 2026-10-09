import type { Pagination } from '@/modules/usage/interfaces/usage.interface';

export type CreditTxKindValue =
  | 'signup_grant'
  | 'purchase'
  | 'video_charge'
  | 'video_refund'
  | 'purchase_refund'
  | 'admin_adjustment';

export interface CreditTierJson {
  id: string;
  name: string;
  min_clips: number;
  max_clips: number;
  credits: number;
  is_default: boolean;
  updated_at: string;
}

/** Volume pricing: purchases of at least `min_eur` (at this rate) get `credits_per_eur` credits per €1. */
export interface CreditRateTierJson {
  id: string;
  min_eur: number;
  credits_per_eur: number;
  updated_at: string;
}

export type VideoAddonKey = 'watermark_removal' | 'import_fetch';

export interface VideoQuote {
  clips: number;
  tier: Pick<
    CreditTierJson,
    'id' | 'name' | 'min_clips' | 'max_clips' | 'credits'
  >;
  addons: { key: VideoAddonKey; credits: number }[];
  total: number;
}

export interface ProjectQuote extends VideoQuote {
  balance: number;
  /** True when the balance covers the total. */
  affordable: boolean;
}

export interface CreditsPricing {
  /** Base rate: whole credits per €1 for purchases below every rate tier. */
  credits_per_eur: number;
  /** Better rates for bigger purchases, ascending by min_eur; empty when there are none. */
  rate_tiers: CreditRateTierJson[];
  max_credits_per_purchase: number;
  signup_grant: number;
  addons: Record<VideoAddonKey, number>;
  tiers: CreditTierJson[];
  /** False when Stripe is not configured (buying is disabled). */
  payments_enabled: boolean;
}

export interface CreditsOverview {
  balance: number;
  pricing: CreditsPricing;
}

export interface CreditTransactionJson {
  id: string;
  kind: CreditTxKindValue;
  credits: number;
  balance_after: number;
  project_id: string | null;
  project_title: string | null;
  purchase_id: string | null;
  note: string | null;
  created_at: string;
}

export interface CreditTransactionsResponse {
  data: CreditTransactionJson[];
  pagination: Pagination;
}
