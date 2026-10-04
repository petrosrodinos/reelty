import { RenderSteps, type RenderStep } from "@/features/projects/interfaces/projects.interfaces";

/** Coarse progress labels (spec FR-BG-2). `UPLOADING` is shown to users as "Finishing". */
export const RenderStepFormOptions: { id: RenderStep; label: string }[] = [
  { id: RenderSteps.QUEUED, label: "Queued" },
  { id: RenderSteps.PREPARING, label: "Preparing photos" },
  { id: RenderSteps.GENERATING, label: "Generating clips" },
  { id: RenderSteps.ASSEMBLING, label: "Assembling" },
  { id: RenderSteps.UPLOADING, label: "Finishing" },
  { id: RenderSteps.COMPLETED, label: "Completed" },
  { id: RenderSteps.FAILED, label: "Failed" },
  { id: RenderSteps.BLOCKED_NO_CREDITS, label: "Delayed, we're on it" },
];

/** The ordered steps shown in the progress stepper. */
export const RenderStepperOrder: RenderStep[] = [
  RenderSteps.QUEUED,
  RenderSteps.PREPARING,
  RenderSteps.GENERATING,
  RenderSteps.ASSEMBLING,
  RenderSteps.UPLOADING,
];

export function getRenderStepLabel(step: RenderStep | null | undefined, clipsDone = 0, clipsTotal = 0): string {
  const base = RenderStepFormOptions.find((option) => option.id === step)?.label ?? "Queued";
  if (step === RenderSteps.GENERATING && clipsTotal > 0) return `${base} (${clipsDone} of ${clipsTotal})`;
  return base;
}
