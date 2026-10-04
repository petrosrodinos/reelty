"use client";

import type { FC } from "react";
import { AlertTriangleIcon, DownloadIcon, Trash2Icon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ProjectStatusBadge } from "@/components/ui/project-status-badge";
import { Spinner } from "@/components/ui/spinner";
import { useDownloadVideo } from "@/features/projects/hooks/use-projects";
import type { Project } from "@/features/projects/interfaces/projects.interfaces";
import { formatDuration, pluralize } from "@/lib/format.utils";
import { PhotoGallery } from "@/views/projects/detail/components/photo-gallery";
import { ProjectPlayer } from "@/views/projects/detail/components/project-player";

interface CompletedViewProps {
  project: Project;
  onDelete: () => void;
}

export const CompletedView: FC<CompletedViewProps> = ({ project, onDelete }) => {
  const download = useDownloadVideo();
  const images = project.images ?? [];
  const skipped = images.filter((image) => image.skipped);
  const clipCount = images.length - skipped.length;

  return (
    <>
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] lg:gap-8">
        <div className="dark rounded-lg bg-surface-dark p-3 sm:p-4">
          <ProjectPlayer projectId={project.id} poster={project.poster_url} />
        </div>
        <div className="flex flex-col gap-4">
          <section className="rounded-lg border border-hairline bg-canvas p-5 sm:p-6" aria-label="Video details">
            <ProjectStatusBadge status={project.status} />
            <p className="mt-3 text-lg font-medium text-ink">{formatDuration(project.duration_seconds)} · 1920×1080 · 30 fps</p>
            <p className="text-sm text-muted-foreground">
              {project.music_enabled ? "With soundtrack" : "Silent track"} · {pluralize(clipCount, "clip")}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button size="lg" onClick={() => download.mutate(project.id)} disabled={download.isPending}>
                {download.isPending ? <Spinner /> : <DownloadIcon />}
                Download MP4
              </Button>
              <Button size="lg" variant="outline" onClick={onDelete}>
                <Trash2Icon /> Delete
              </Button>
            </div>
          </section>
          {project.partial || skipped.length > 0 ? (
            <Alert className="border-hairline bg-notice-warn">
              <AlertTriangleIcon aria-hidden="true" />
              <AlertDescription className="text-ink">
                <strong className="font-medium">Partial video.</strong>{" "}
                {project.failure_reason ??
                  `${pluralize(skipped.length, "photo was", "photos were")} skipped because their clips could not be generated.`}{" "}
                {skipped.length > 0 ? "They are marked below." : null}
              </AlertDescription>
            </Alert>
          ) : null}
        </div>
      </div>
      <PhotoGallery projectId={project.id} images={images} />
    </>
  );
};
