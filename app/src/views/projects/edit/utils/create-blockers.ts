import type { Me } from "@/features/auth/interfaces/auth.interfaces";
import type { VideoQuote } from "@/features/credits/interfaces/credits.interfaces";
import type { VideoImageLimits } from "@/features/credits/utils/credit-pricing.utils";
import { WatermarkStatuses } from "@/features/images/interfaces/images.interfaces";
import type { Project } from "@/features/projects/interfaces/projects.interfaces";
import type { Usage } from "@/features/usage/interfaces/usage.interfaces";

interface BlockerInput {
  project: Project;
  me: Me;
  usage: Usage | undefined;
  /** Price of the video as it stands; undefined while pricing loads. */
  quote: VideoQuote | undefined;
  /** Photos per video allowed by the credit tiers. */
  limits: VideoImageLimits;
}

/** Everything that currently stops "Create video", in priority order. Empty array means ready. */
export function getCreateBlockers({ project, me, usage, quote, limits }: BlockerInput): string[] {
  const images = project.images ?? [];
  const count = images.length;
  const blockers: string[] = [];

  if (!me.email_verified) blockers.push("Verify your email to create a video.");
  if (count < limits.minImages) blockers.push(`Add at least ${limits.minImages} photos (you have ${count}).`);
  if (count > limits.maxImages) {
    const extra = count - limits.maxImages;
    blockers.push(`Remove ${extra} photo${extra > 1 ? "s" : ""} (max ${limits.maxImages}).`);
  }
  if (images.some((image) => image.wm_status === WatermarkStatuses.PROCESSING)) {
    blockers.push("Waiting for watermark removal to finish.");
  }
  if (quote && count >= limits.minImages && me.credits.balance < quote.total) {
    blockers.push(`This video costs ${quote.total} credits and you have ${me.credits.balance}. Buy credits to continue.`);
  }
  if (usage?.active_render_project_id && usage.active_render_project_id !== project.id) {
    blockers.push("You already have a video being created. One at a time.");
  }
  return blockers;
}
