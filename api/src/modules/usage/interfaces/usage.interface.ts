export interface Quota {
  used: number;
  limit: number;
  remaining: number;
  resets_at: string;
}

export interface UsageResponse extends Quota {
  active_render_project_id: string | null;
}
