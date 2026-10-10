import type { Pagination } from "@/features/projects/interfaces/projects.interfaces";

export const PurchaseStatuses = {
  PENDING: "pending",
  PAID: "paid",
  FAILED: "failed",
  EXPIRED: "expired",
  REFUNDED: "refunded",
  PARTIALLY_REFUNDED: "partially_refunded",
} as const;
export type PurchaseStatus = (typeof PurchaseStatuses)[keyof typeof PurchaseStatuses];

export interface CreateCheckoutDto {
  credits: number;
  /** Slider value, stored for reference. */
  videos_selected?: number;
  /** Project whose edit page Stripe sends the buyer back to; omitted means the credits page. */
  return_project_id?: string;
}

export interface CheckoutResponse {
  /** Stripe-hosted payment page. */
  url: string;
  purchase_id: string;
}

/** A credit purchase as the buyer sees it (amounts in euro cents, no fees). */
export interface Purchase {
  id: string;
  status: PurchaseStatus;
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

export interface Purchases {
  data: Purchase[];
  pagination: Pagination;
}

export interface PurchasesQuery {
  page?: number;
  limit?: number;
}

/** Operator view of a purchase: Stripe fee, net and USD figures (all cents). */
export interface AdminPurchase extends Purchase {
  user_id: string;
  user_email: string;
  credits_per_eur: number;
  stripe_fee_eur_cents: number | null;
  net_eur_cents: number | null;
  /** Fee as % of the amount paid. */
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

/** Totals over settled purchases (paid / refunded) in the filtered set. */
export interface PurchasesSummary {
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
  avg_fee_pct: number;
}

export interface AdminPurchases {
  data: AdminPurchase[];
  pagination: Pagination;
  summary: PurchasesSummary;
}

export interface AdminPurchasesQuery {
  page?: number;
  limit?: number;
  user_id?: string;
  status?: PurchaseStatus;
  /** ISO datetime, inclusive. */
  from?: string;
  /** ISO datetime, exclusive. */
  to?: string;
}
