import type { Quota } from "@/features/auth/interfaces/auth.interfaces";

export interface Usage extends Quota {
  active_render_project_id: string | null;
}
