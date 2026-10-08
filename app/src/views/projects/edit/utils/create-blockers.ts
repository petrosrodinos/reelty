import type { Me } from "@/features/auth/interfaces/auth.interfaces";
import type { VideoQuote } from "@/features/credits/interfaces/credits.interfaces";
import { WatermarkStatuses } from "@/features/images/interfaces/images.interfaces";
import type { Project } from "@/features/projects/interfaces/projects.interfaces";
import type { Usage } from "@/features/usage/interfaces/usage.interfaces";
import { VideoLimits } from "@/lib/format.utils";

interface BlockerInput {
  project: Project;
  me: Me;
  usage: Usage | undefined;
  /** Price of the video as it stands; undefined while pricing loads. */
  quote: VideoQuote | undefined;
}

/** Everything that currently stops "Create video", in priority order. Empty array means ready. */
export function getCreateBlockers({ project, me, usage, quote }: BlockerInput): string[] {
  const images = project.images ?? [];
  const count = images.length;
  const blockers: string[] = [];

  if (!me.email_verified) blockers.push("Verify your email to create a video.");
  if (count < VideoLimits.minImages) blockers.push(`Add at least ${VideoLimits.minImages} photos (you have ${count}).`);
  if (count > VideoLimits.maxImages) {
    const extra = count - VideoLimits.maxImages;
    blockers.push(`Remove ${extra} photo${extra > 1 ? "s" : ""} (max ${VideoLimits.maxImages}).`);
  }
  if (images.some((image) => image.wm_status === WatermarkStatuses.PROCESSING)) {
    blockers.push("Waiting for watermark removal to finish.");
  }
  if (quote && count >= VideoLimits.minImages && me.credits.balance < quote.total) {
    blockers.push(`This video costs ${quote.total} credits and you have ${me.credits.balance}. Buy credits to continue.`);
  }
  if (usage?.active_render_project_id && usage.active_render_project_id !== project.id) {
    blockers.push("You already have a video being created. One at a time.");
  }
  return blockers;
}
