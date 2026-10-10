import type { Pagination } from '@/modules/usage/interfaces/usage.interface';

export type PurchaseStatusValue =
  | 'pending'
  | 'paid'
  | 'failed'
  | 'expired'
  | 'refunded'
  | 'partially_refunded';

export interface CheckoutResponse {
  /** Stripe-hosted checkout page to redirect to. */
  url: string;
  purchase_id: string;
}

export interface PurchaseFigures {
  stripe_fee_eur_cents: number | null;
  net_eur_cents: number | null;
  stripe_fee_pct: number | null;
  usd_per_eur: number;
  amount_usd_cents: number;
  stripe_fee_usd_cents: number | null;
  net_usd_cents: number | null;
}

/** User-facing purchase. Fees are never exposed here. */
export interface PurchaseJson {
  id: string;
  status: PurchaseStatusValue;
  credits: number;
  videos_selected: number | null;
  currency: string;
  amount_eur_cents: number;
  refunded_eur_cents: number;
  receipt_url: string | null;
  /** Stripe's customer-facing reason when the payment failed. */
  failure_message: string | null;
  paid_at: string | null;
  failed_at: string | null;
  created_at: string;
}

export interface PurchasesResponse {
  data: PurchaseJson[];
  pagination: Pagination;
}

export interface AdminPurchaseJson extends PurchaseJson {
  user_id: string;
  user_email: string;
  credits_per_eur: number;
  stripe_fee_eur_cents: number | null;
  net_eur_cents: number | null;
  stripe_fee_pct: number | null;
  usd_per_eur: number | null;
  amount_usd_cents: number | null;
  stripe_fee_usd_cents: number | null;
  net_usd_cents: number | null;
  refunded_credits: number;
  stripe_checkout_session_id: string | null;
  stripe_payment_intent_id: string | null;
  stripe_charge_id: string | null;
  payment_method_type: string | null;
  card_brand: string | null;
  card_country: string | null;
  failure_code: string | null;
  failure_decline: string | null;
}

export interface PurchasesSummary {
  /** Settled purchases (paid / refunded / partially refunded) in the filtered set. */
  purchases: number;
  credits: number;
  refunded_credits: number;
  amount_eur_cents: number;
  stripe_fee_eur_cents: number;
  net_eur_cents: number;
  refunded_eur_cents: number;
  amount_usd_cents: number;
  stripe_fee_usd_cents: number;
  net_usd_cents: number;
  /** Total fees / total gross x 100. */
  avg_fee_pct: number;
}

export interface AdminPurchasesResponse {
  data: AdminPurchaseJson[];
  pagination: Pagination;
  summary: PurchasesSummary;
}
