"use client";

import type { FC } from "react";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { VideoPlayer } from "@/components/ui/video-player";
import { VIDEO_PLAY_URL_QUERY_KEY, useVideoPlayUrl } from "@/features/projects/hooks/use-projects";
import type { ProjectListItem } from "@/features/projects/interfaces/projects.interfaces";
import { Routes } from "@/routes/routes";

interface ProjectPlayerDialogProps {
  project: ProjectListItem | null;
  onClose: () => void;
}

/** Inline player in a modal so "Play" on a card never leaves the library (FR-LIB-2). */
export const ProjectPlayerDialog: FC<ProjectPlayerDialogProps> = ({ project, onClose }) => {
  const queryClient = useQueryClient();
  const projectId = project?.id ?? "";
  const { data, isPending, isError, refetch, isFetching } = useVideoPlayUrl(projectId, !!project);

  return (
    <Dialog open={!!project} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[calc(100%-1.5rem)] sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{project?.title || "Untitled video"}</DialogTitle>
          <DialogDescription>AI-generated from your photos. It may differ from the real property.</DialogDescription>
        </DialogHeader>
        {isPending ? (
          <Skeleton className="aspect-video w-full rounded-lg" />
        ) : isError || !data ? (
          <div className="grid aspect-video place-items-center rounded-lg bg-surface-dark p-6 text-center text-on-dark">
            <div>
              <p className="font-medium">We could not load the video.</p>
              <Button className="mt-4" onClick={() => refetch()} disabled={isFetching}>
                Try again
              </Button>
            </div>
          </div>
        ) : (
          <VideoPlayer
            src={data.url}
            poster={project?.poster_url}
            autoPlay
            onError={() => queryClient.invalidateQueries({ queryKey: [VIDEO_PLAY_URL_QUERY_KEY, projectId] })}
          />
        )}
        {project ? (
          <div>
            <Button variant="outline" render={<Link href={Routes.project(project.id)} />} nativeButton={false}>
              Open details and photos
            </Button>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};
