import type { Quota } from "@/features/auth/interfaces/auth.interfaces";
import type { Pagination } from "@/features/projects/interfaces/projects.interfaces";

export interface Usage extends Quota {
  active_render_project_id: string | null;
}

export const LedgerKinds = {
  VIDEO: "video",
  VIDEO_REFUND: "video_refund",
} as const;
export type LedgerKind = (typeof LedgerKinds)[keyof typeof LedgerKinds];

/** One quota charge or refund. Provider costs are operator-only and never returned to users. */
export interface LedgerEntry {
  id: string;
  project_id: string | null;
  project_title: string | null;
  kind: LedgerKind;
  /** +1 charge, -1 refund */
  quota_units: number;
  created_at: string;
}

export interface UsageHistory {
  data: LedgerEntry[];
  pagination: Pagination;
}

export interface UsageHistoryQuery {
  page?: number;
  limit?: number;
  kind?: LedgerKind;
}
