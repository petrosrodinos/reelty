"use client";

import type { FC } from "react";
import Link from "next/link";
import { DownloadIcon, FilmIcon, PlayIcon, RefreshCwIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectStatusBadge } from "@/components/ui/project-status-badge";
import { Spinner } from "@/components/ui/spinner";
import { ProjectSourceTypeFormOptions } from "@/config/constants/dropdowns/projects/project-source-type-form.options";
import { getRenderStepLabel } from "@/config/constants/dropdowns/projects/render-step-form.options";
import { RenderSteps, ProjectStatuses, type ProjectListItem } from "@/features/projects/interfaces/projects.interfaces";
import { getDropdownOptionLabel } from "@/lib/dropdown-option-label.utils";
import { formatDuration, formatProjectDate, pluralize } from "@/lib/format.utils";
import { cn } from "@/lib/utils";
import { Routes } from "@/routes/routes";

interface VideoCardProps {
  project: ProjectListItem;
  isRetrying: boolean;
  isDownloading: boolean;
  onPlay: () => void;
  onDownload: () => void;
  onRetry: () => void;
  onDelete: () => void;
}

const Poster: FC<{ project: ProjectListItem }> = ({ project }) => {
  const previews = project.preview_thumb_urls ?? [];
  if (project.poster_url) {
    return <img src={project.poster_url} alt="" loading="lazy" className="size-full object-cover" />;
  }
  if (previews.length === 1) {
    return <img src={previews[0]} alt="" loading="lazy" className="size-full object-cover" />;
  }
  if (previews.length > 1) {
    return (
      <div className="grid size-full grid-cols-2 grid-rows-2 gap-px bg-surface-dark">
        {previews.slice(0, 4).map((url) => (
          <img key={url} src={url} alt="" loading="lazy" className="size-full object-cover" />
        ))}
      </div>
    );
  }
  return (
    <span className="grid size-full place-items-center bg-surface-dark text-on-dark-soft">
      <FilmIcon className="size-8" aria-hidden="true" />
    </span>
  );
};

export const VideoCard: FC<VideoCardProps> = ({ project, isRetrying, isDownloading, onPlay, onDownload, onRetry, onDelete }) => {
  const { status } = project;
  const isEditing = status === ProjectStatuses.DRAFT || status === ProjectStatuses.READY;
  const isScrapeFailure = status === ProjectStatuses.FAILED && !project.submitted_at;
  const busy = status === ProjectStatuses.FETCHING || status === ProjectStatuses.QUEUED || status === ProjectStatuses.CREATING;
  const delayed = project.render_step === RenderSteps.BLOCKED_NO_CREDITS;
  const href = isEditing || status === ProjectStatuses.FETCHING || isScrapeFailure ? Routes.edit(project.id) : Routes.project(project.id);
  const title = project.title || "Untitled video";

  const overlayText =
    status === ProjectStatuses.FETCHING
      ? "Fetching photos…"
      : delayed
        ? getRenderStepLabel(RenderSteps.BLOCKED_NO_CREDITS)
        : getRenderStepLabel(project.render_step ?? RenderSteps.QUEUED, project.clips_done, project.clips_total);

  const detail =
    status === ProjectStatuses.FAILED ? (
      <p className="line-clamp-2 text-sm text-error">{project.failure_reason ?? "We could not finish this video."}</p>
    ) : project.partial ? (
      <p className="text-sm text-muted-foreground">Partial video: some photos were skipped</p>
    ) : (
      <p className="text-sm text-muted-foreground">
        {pluralize(project.image_count, "photo")} · {getDropdownOptionLabel(ProjectSourceTypeFormOptions, project.source_type)}
      </p>
    );

  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-hairline bg-canvas">
      <Link href={href} className="group relative block aspect-video overflow-hidden bg-surface-dark outline-none focus-visible:ring-3 focus-visible:ring-ring" aria-label={`${title}, ${status.toLowerCase()}`}>
        <Poster project={project} />
        <ProjectStatusBadge status={status} renderStep={project.render_step} className="absolute left-2.5 top-2.5 bg-canvas" />
        {status === ProjectStatuses.COMPLETED && project.duration_seconds ? (
          <span className="absolute bottom-2.5 right-2.5 rounded-full bg-surface-dark/75 px-2 py-0.5 text-xs font-medium text-on-dark">
            {formatDuration(project.duration_seconds)}
          </span>
        ) : null}
        {busy ? (
          <span className="absolute inset-0 grid place-items-center bg-surface-dark/60 p-3 text-center text-[0.8125rem] font-medium text-on-dark">
            {overlayText}
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 p-4 sm:p-5">
        <h3 className="line-clamp-2 break-words text-lg font-medium leading-snug text-ink">{title}</h3>
        {detail}
        <p className="text-[0.8125rem] font-medium text-muted-foreground">{formatProjectDate(project.created_at)}</p>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-3">
          {status === ProjectStatuses.COMPLETED ? (
            <>
              <Button onClick={onPlay}>
                <PlayIcon className="fill-current" /> Play
              </Button>
              <Button variant="outline" onClick={onDownload} disabled={isDownloading}>
                {isDownloading ? <Spinner /> : <DownloadIcon />} Download MP4
              </Button>
            </>
          ) : null}
          {status === ProjectStatuses.FAILED && !isScrapeFailure ? (
            <>
              <Button onClick={onRetry} disabled={isRetrying}>
                {isRetrying ? <Spinner /> : <RefreshCwIcon />} Retry
              </Button>
              <Button variant="outline" render={<Link href={Routes.project(project.id)} />} nativeButton={false}>
                Details
              </Button>
            </>
          ) : null}
          {isScrapeFailure ? (
            <Button variant="outline" render={<Link href={Routes.edit(project.id)} />} nativeButton={false}>
              Details
            </Button>
          ) : null}
          {isEditing ? (
            <Button render={<Link href={Routes.edit(project.id)} />} nativeButton={false}>
              Continue editing
            </Button>
          ) : null}
          {busy ? (
            <Button variant="outline" render={<Link href={href} />} nativeButton={false}>
              View progress
            </Button>
          ) : null}
          {status !== ProjectStatuses.QUEUED && status !== ProjectStatuses.CREATING ? (
            <Button variant="ghost" size="icon" className={cn("ml-auto")} aria-label={`Delete ${title}`} onClick={onDelete}>
              <Trash2Icon />
            </Button>
          ) : null}
        </div>
      </div>
    </article>
  );
};
