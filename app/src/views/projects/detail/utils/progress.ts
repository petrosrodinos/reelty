import { RenderStepperOrder } from "@/config/constants/dropdowns/projects/render-step-form.options";
import { RenderSteps, type Project, type RenderStep } from "@/features/projects/interfaces/projects.interfaces";

/** Index of the active step in the stepper. A delayed render stays on "Generating clips". */
export function getActiveStepIndex(step: RenderStep | null): number {
  const effective = step === RenderSteps.BLOCKED_NO_CREDITS ? RenderSteps.GENERATING : (step ?? RenderSteps.QUEUED);
  const index = RenderStepperOrder.indexOf(effective);
  return index < 0 ? 0 : index;
}

/** Coarse 0-100 progress derived from the persisted render step and clip counts. */
export function getProgressPercent(project: Project): number {
  const total = Math.max(1, project.clips_total);
  const clipShare = Math.min(1, project.clips_done / total);
  switch (project.render_step) {
    case RenderSteps.PREPARING:
      return 14;
    case RenderSteps.GENERATING:
    case RenderSteps.BLOCKED_NO_CREDITS:
      return Math.round(18 + 62 * clipShare);
    case RenderSteps.ASSEMBLING:
      return 88;
    case RenderSteps.UPLOADING:
      return 96;
    case RenderSteps.COMPLETED:
      return 100;
    default:
      return 4;
  }
}
