export interface UsageResponse {
  credit_balance: number;
  active_render_project_id: string | null;
}

export type LedgerKindValue = 'video' | 'video_refund' | 'dewatermark' | 'scrape' | 'higgsfield';

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

// ---- operator-only: provider costs

export interface CostBreakdownItem {
  kind: LedgerKindValue;
  entries: number;
  quota_units: number;
  /** Provider credits consumed (Higgsfield, dewatermark). 0 for kinds billed in USD. */
  credits: number;
  cost_usd: number;
}

export interface CostSummary {
  entries: number;
  total_cost_usd: number;
  /** Part of total_cost_usd that comes from app_config prices rather than a provider-reported amount. */
  estimated_cost_usd: number;
  breakdown: CostBreakdownItem[];
}

export interface ProjectCostSummary extends CostSummary {
  project_id: string;
}

export interface CostLedgerEntry {
  id: string;
  user_id: string;
  user_email: string;
  project_id: string | null;
  project_title: string | null;
  kind: LedgerKindValue;
  quota_units: number;
  credits: number | null;
  cost_usd: number | null;
  cost_estimated: boolean;
  note: string | null;
  created_at: string;
}

export interface CostHistoryResponse {
  data: CostLedgerEntry[];
  pagination: Pagination;
  /** Aggregates over the whole filtered set, not just the current page. */
  summary: CostSummary;
}
