"use client";

import type { FC } from "react";
import Link from "next/link";
import { CheckIcon, ClockIcon, InfoIcon } from "lucide-react";
import { ProjectStatusBadge } from "@/components/ui/project-status-badge";
import { RenderStepperOrder, getRenderStepLabel } from "@/config/constants/dropdowns/projects/render-step-form.options";
import { RenderSteps, type Project } from "@/features/projects/interfaces/projects.interfaces";
import { cn } from "@/lib/utils";
import { Routes } from "@/routes/routes";
import { getActiveStepIndex, getProgressPercent } from "@/views/projects/detail/utils/progress";

/** Persistent "come back later" banner (FR-BG-1) shown for every queued or creating project. */
export const BackgroundBanner: FC = () => (
  <div className="flex items-start gap-3 rounded-lg bg-surface-card px-4 py-3.5 text-sm text-ink" role="status">
    <InfoIcon className="mt-0.5 size-[18px] shrink-0 text-brand" aria-hidden="true" />
    <p>
      <strong className="font-medium">Your video is being created.</strong> This can take several minutes. You don&apos;t need to wait here. Close this
      page and come back later; it will appear in{" "}
      <Link href={Routes.videos} className="font-medium text-primary underline underline-offset-2">
        My Videos
      </Link>{" "}
      when it&apos;s ready.
    </p>
  </div>
);

export const ProgressCard: FC<{ project: Project }> = ({ project }) => {
  const delayed = project.render_step === RenderSteps.BLOCKED_NO_CREDITS;
  const activeIndex = getActiveStepIndex(project.render_step);
  const percent = getProgressPercent(project);

  return (
    <section className="rounded-lg border border-hairline bg-canvas p-5 sm:p-8" aria-labelledby="progress-heading">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="progress-heading" className="sr-only">
          Video progress
        </h2>
        <ProjectStatusBadge status={project.status} renderStep={project.render_step} />
        <span className="text-[0.8125rem] text-muted-foreground">Only one video at a time</span>
      </div>

      {delayed ? (
        <div className="mt-5 flex items-start gap-3 rounded-md bg-notice-warn px-4 py-3.5 text-sm text-ink" role="status">
          <ClockIcon className="mt-0.5 size-[18px] shrink-0" aria-hidden="true" />
          <p>
            <strong className="font-medium">Delayed, we&apos;re on it.</strong> Our video provider ran out of capacity. Finished clips are kept and
            nothing is charged again. Your video will resume automatically.
          </p>
        </div>
      ) : null}

      <div
        className="mt-6 h-2 overflow-hidden rounded-full bg-surface-card"
        role="progressbar"
        aria-label="Video progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
      >
        <div className="h-full rounded-full bg-brand transition-[width] duration-500" style={{ width: `${percent}%` }} />
      </div>

      <ol className="mt-6 flex flex-col gap-3.5">
        {RenderStepperOrder.map((step, index) => {
          const done = index < activeIndex;
          const current = index === activeIndex;
          return (
            <li
              key={step}
              aria-current={current ? "step" : undefined}
              className={cn("flex items-center gap-3 text-[0.9375rem]", done ? "text-body" : current ? "font-medium text-ink" : "text-muted-foreground")}
            >
              <span
                className={cn(
                  "grid size-[22px] shrink-0 place-items-center rounded-full border-[1.5px]",
                  done ? "border-teal bg-teal text-ink" : current ? "border-brand text-brand" : "border-hairline bg-canvas",
                )}
                aria-hidden="true"
              >
                {done ? <CheckIcon className="size-3" /> : null}
                {current && !done ? <span className="size-2 animate-pulse rounded-full bg-brand" /> : null}
              </span>
              {getRenderStepLabel(step, project.clips_done, project.clips_total)}
              <span className="sr-only">{done ? " (done)" : current ? " (in progress)" : ""}</span>
            </li>
          );
        })}
      </ol>
    </section>
  );
};
