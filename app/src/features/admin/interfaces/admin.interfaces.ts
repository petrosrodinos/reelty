import type { Pagination } from "@/features/projects/interfaces/projects.interfaces";

export interface AppConfigItem {
  key: string;
  value: number;
  unit: "usd" | "credits" | "ratio";
  description: string | null;
  /** Only whole numbers are accepted. */
  integer: boolean;
  /** Smallest accepted value. */
  min: number;
  /** False when no row exists yet and the built-in default is in use. */
  stored: boolean;
  updated_at: string | null;
}

export const CostLedgerKinds = {
  VIDEO: "video",
  VIDEO_REFUND: "video_refund",
  HIGGSFIELD: "higgsfield",
  DEWATERMARK: "dewatermark",
  SCRAPE: "scrape",
} as const;
export type CostLedgerKind = (typeof CostLedgerKinds)[keyof typeof CostLedgerKinds];

export interface CostBreakdownItem {
  kind: CostLedgerKind;
  entries: number;
  quota_units: number;
  credits: number;
  cost_usd: number;
}

export interface CostSummary {
  entries: number;
  total_cost_usd: number;
  /** Part of the total computed from configured prices rather than provider-reported amounts. */
  estimated_cost_usd: number;
  breakdown: CostBreakdownItem[];
}

export interface CostLedgerEntry {
  id: string;
  user_id: string;
  user_email: string;
  project_id: string | null;
  project_title: string | null;
  kind: CostLedgerKind;
  quota_units: number;
  credits: number | null;
  cost_usd: number | null;
  cost_estimated: boolean;
  note: string | null;
  created_at: string;
}

export interface CostHistory {
  data: CostLedgerEntry[];
  pagination: Pagination;
  summary: CostSummary;
}

export interface CostHistoryQuery {
  page?: number;
  limit?: number;
  kind?: CostLedgerKind;
  user_id?: string;
  /** ISO datetime, inclusive. */
  from?: string;
  /** ISO datetime, exclusive. */
  to?: string;
}

export interface AdminUserOption {
  id: string;
  email: string;
  credit_balance: number;
  full_name: string | null;
  role: "USER" | "ADMIN" | "SUPER_ADMIN" | "SUPPORT";
  email_verified_at: string | null;
  created_at: string;
  projects_count: number;
}
