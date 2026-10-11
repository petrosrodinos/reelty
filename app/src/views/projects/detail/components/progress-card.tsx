"use client";

import { useEffect, useRef, useState, type FC } from "react";
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

/** Eases the displayed number toward `target` so the percentage counts up instead of jumping. */
function useAnimatedNumber(target: number): number {
  const [value, setValue] = useState(target);
  const valueRef = useRef(target);

  useEffect(() => {
    const from = valueRef.current;
    if (from === target) return;
    const start = performance.now();
    const duration = 600;
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const next = Math.round(from + (target - from) * (1 - Math.pow(1 - t, 3)));
      valueRef.current = next;
      setValue(next);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target]);

  return value;
}

/** Live "m:ss" counter since the project was submitted. */
function useElapsed(since: string | null): string | null {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!since) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [since]);

  if (!since) return null;
  const seconds = Math.max(0, Math.floor((now - new Date(since).getTime()) / 1000));
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

export const ProgressCard: FC<{ project: Project }> = ({ project }) => {
  const delayed = project.render_step === RenderSteps.BLOCKED_NO_CREDITS;
  const activeIndex = getActiveStepIndex(project.render_step);
  const percent = getProgressPercent(project);
  const shownPercent = useAnimatedNumber(percent);
  const elapsed = useElapsed(project.submitted_at ?? null);

  return (
    <section className="rounded-lg border border-hairline bg-canvas p-5 sm:p-8" aria-labelledby="progress-heading">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="progress-heading" className="sr-only">
          Video progress
        </h2>
        <ProjectStatusBadge status={project.status} renderStep={project.render_step} />
        <span className="text-[0.8125rem] text-muted-foreground">{elapsed ? `Elapsed ${elapsed}` : "Only one video at a time"}</span>
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

      <div className="mt-6 flex items-baseline justify-between">
        <span className="text-sm text-muted-foreground">{delayed ? "Waiting to resume" : "Creating your video"}</span>
        <span className="text-display-sm tabular-nums" aria-hidden="true">
          {shownPercent}%
        </span>
      </div>
      <div
        className="mt-2 h-2.5 overflow-hidden rounded-full bg-surface-card"
        role="progressbar"
        aria-label="Video progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
      >
        <div className="relative h-full overflow-hidden rounded-full bg-brand transition-[width] duration-700 ease-out" style={{ width: `${percent}%` }}>
          {delayed ? null : <span className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent" />}
        </div>
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
                  "relative grid size-[22px] shrink-0 place-items-center rounded-full border-[1.5px] transition-colors duration-300",
                  done ? "border-teal bg-teal text-ink" : current ? "border-brand text-brand" : "border-hairline bg-canvas",
                )}
                aria-hidden="true"
              >
                {done ? <CheckIcon className="size-3 animate-pop-in" /> : null}
                {current && !done ? (
                  <>
                    <span className="absolute inset-0 animate-ping rounded-full bg-brand/30" />
                    <span className="relative size-2 rounded-full bg-brand" />
                  </>
                ) : null}
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
