"use client";

import { useState, type FC } from "react";
import Link from "next/link";
import { FilmIcon, PlusIcon, WifiOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfirmationDialog from "@/components/ui/confirmation-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatePanel } from "@/components/ui/state-panel";
import { ProjectStatusFilterOptions } from "@/config/constants/dropdowns/projects/project-status-filter.options";
import {
  useDeleteProject,
  useDownloadVideo,
  useProjects,
  useRetryProject,
} from "@/features/projects/hooks/use-projects";
import type { ProjectListItem, ProjectStatus } from "@/features/projects/interfaces/projects.interfaces";
import { Routes } from "@/routes/routes";
import { ProjectPlayerDialog } from "@/views/videos/components/project-player-dialog";
import { VideoCard } from "@/views/videos/components/video-card";
import { VideosSkeleton } from "@/views/videos/components/videos-skeleton";

const statusItems = ProjectStatusFilterOptions.map((option) => ({ value: option.id, label: option.label }));

const VideosPage: FC = () => {
  const [status, setStatus] = useState<ProjectStatus | "all">("all");
  const [page, setPage] = useState(1);
  const [playing, setPlaying] = useState<ProjectListItem | null>(null);
  const [deleting, setDeleting] = useState<ProjectListItem | null>(null);

  const { data, isPending, error, refetch, isFetching } = useProjects({
    page,
    status: status === "all" ? undefined : status,
  });
  const retry = useRetryProject();
  const download = useDownloadVideo();
  const deleteProject = useDeleteProject();

  const projects = data?.data ?? [];
  const pagination = data?.pagination;
  const filtered = status !== "all";

  const changePage = (next: number) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="page-container py-10 md:py-14">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-eyebrow text-muted-foreground">Library</p>
          <h1 className="text-display-lg mt-2">My Videos</h1>
        </div>
        <Button size="lg" render={<Link href={Routes.new} />} nativeButton={false}>
          <PlusIcon /> New video
        </Button>
      </div>

      <div className="mb-8 flex flex-wrap items-center gap-3">
        <Select
          value={status}
          onValueChange={(value) => {
            setStatus(value as ProjectStatus | "all");
            setPage(1);
          }}
          items={statusItems}
        >
          <SelectTrigger aria-label="Filter by status" className="h-11 w-full sm:w-56">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ProjectStatusFilterOptions.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {pagination ? (
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {pagination.total} {pagination.total === 1 ? "project" : "projects"}
          </p>
        ) : null}
      </div>

      {isPending ? (
        <VideosSkeleton />
      ) : error ? (
        <StatePanel
          icon={<WifiOffIcon className="size-6" />}
          title="We could not load your videos"
          description={error.message}
        >
          <Button onClick={() => refetch()} disabled={isFetching}>
            Try again
          </Button>
        </StatePanel>
      ) : projects.length === 0 ? (
        <StatePanel
          icon={<FilmIcon className="size-6" />}
          title={filtered ? "Nothing here" : "No videos yet"}
          description={
            filtered
              ? "No projects match this filter."
              : "Create your first walkthrough video from a listing link or your photos."
          }
        >
          {filtered ? (
            <Button variant="outline" onClick={() => setStatus("all")}>
              Clear filter
            </Button>
          ) : (
            <Button size="lg" render={<Link href={Routes.new} />} nativeButton={false}>
              Create a video
            </Button>
          )}
        </StatePanel>
      ) : (
        <>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <li key={project.id} className="flex">
                <div className="flex w-full flex-col [&>article]:flex-1">
                  <VideoCard
                    project={project}
                    isRetrying={retry.isPending && retry.variables === project.id}
                    isDownloading={download.isPending && download.variables === project.id}
                    onPlay={() => setPlaying(project)}
                    onDownload={() => download.mutate(project.id)}
                    onRetry={() => retry.mutate(project.id)}
                    onDelete={() => setDeleting(project)}
                  />
                </div>
              </li>
            ))}
          </ul>
          {pagination && pagination.total_pages > 1 ? (
            <nav className="mt-10 flex items-center justify-center gap-4" aria-label="Pagination">
              <Button variant="outline" disabled={!pagination.has_prev || isFetching} onClick={() => changePage(page - 1)}>
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {pagination.page} of {pagination.total_pages}
              </span>
              <Button variant="outline" disabled={!pagination.has_next || isFetching} onClick={() => changePage(page + 1)}>
                Next
              </Button>
            </nav>
          ) : null}
        </>
      )}

      <ProjectPlayerDialog project={playing} onClose={() => setPlaying(null)} />

      <ConfirmationDialog
        isOpen={!!deleting}
        onClose={() => setDeleting(null)}
        title="Delete this project?"
        description={`This permanently removes "${deleting?.title || "Untitled video"}", its video, poster and every photo from storage. This cannot be undone.`}
        confirmText="Delete project"
        variant="destructive"
        isLoading={deleteProject.isPending}
        onConfirm={() =>
          deleting &&
          deleteProject.mutate(deleting.id, {
            onSettled: () => setDeleting(null),
          })
        }
      />
    </div>
  );
};

export default VideosPage;
