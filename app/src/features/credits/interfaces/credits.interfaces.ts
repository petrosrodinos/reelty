import type { Pagination } from "@/features/projects/interfaces/projects.interfaces";

export interface CreditTier {
  id: string;
  name: string;
  /** Inclusive clip range this tier prices. */
  min_clips: number;
  max_clips: number;
  credits: number;
  /** Reference tier used by the purchase slider to turn "videos" into credits. */
  is_default: boolean;
  updated_at: string;
}

export const VideoAddonKeys = {
  WATERMARK_REMOVAL: "watermark_removal",
  IMPORT_FETCH: "import_fetch",
} as const;
export type VideoAddonKey = (typeof VideoAddonKeys)[keyof typeof VideoAddonKeys];

export interface CreditsPricing {
  credits_per_eur: number;
  max_credits_per_purchase: number;
  signup_grant: number;
  addons: Record<VideoAddonKey, number>;
  tiers: CreditTier[];
  /** False when the server has no Stripe keys (buying is disabled). */
  payments_enabled: boolean;
}

export interface CreditsOverview {
  balance: number;
  pricing: CreditsPricing;
}

export interface VideoQuote {
  clips: number;
  tier: Pick<CreditTier, "id" | "name" | "min_clips" | "max_clips" | "credits"> | null;
  addons: { key: VideoAddonKey; credits: number }[];
  total: number;
}

export const CreditTxKinds = {
  SIGNUP_GRANT: "signup_grant",
  PURCHASE: "purchase",
  VIDEO_CHARGE: "video_charge",
  VIDEO_REFUND: "video_refund",
  PURCHASE_REFUND: "purchase_refund",
  ADMIN_ADJUSTMENT: "admin_adjustment",
} as const;
export type CreditTxKind = (typeof CreditTxKinds)[keyof typeof CreditTxKinds];

/** One change to the credit balance. `credits` is signed: positive adds, negative spends. */
export interface CreditTransaction {
  id: string;
  kind: CreditTxKind;
  credits: number;
  balance_after: number;
  project_id: string | null;
  project_title: string | null;
  purchase_id: string | null;
  note: string | null;
  created_at: string;
}

export interface CreditTransactions {
  data: CreditTransaction[];
  pagination: Pagination;
}

export interface CreditTransactionsQuery {
  page?: number;
  limit?: number;
  kind?: CreditTxKind;
}
