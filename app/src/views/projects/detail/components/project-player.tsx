"use client";

import { useRef, type FC } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { VideoPlayer } from "@/components/ui/video-player";
import { VIDEO_PLAY_URL_QUERY_KEY, useVideoPlayUrl } from "@/features/projects/hooks/use-projects";

interface ProjectPlayerProps {
  projectId: string;
  poster: string | null;
}

/** Inline player fed by a signed play-url. If the 15-minute link expires mid-session it refetches once. */
export const ProjectPlayer: FC<ProjectPlayerProps> = ({ projectId, poster }) => {
  const queryClient = useQueryClient();
  const { data, isPending, isError, refetch, isFetching } = useVideoPlayUrl(projectId, true);
  const refreshedRef = useRef(false);

  if (isPending) return <Skeleton className="aspect-video w-full rounded-lg" />;

  if (isError || !data) {
    return (
      <div className="grid aspect-video place-items-center rounded-lg bg-surface-dark p-6 text-center text-on-dark">
        <div>
          <p className="font-medium">We could not load the video.</p>
          <p className="mt-1 text-sm text-on-dark-soft">You can still download it.</p>
          <Button className="mt-4" onClick={() => refetch()} disabled={isFetching}>
            Try again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <VideoPlayer
      src={data.url}
      poster={poster}
      onError={() => {
        if (refreshedRef.current) return;
        refreshedRef.current = true;
        queryClient.invalidateQueries({ queryKey: [VIDEO_PLAY_URL_QUERY_KEY, projectId] });
      }}
    />
  );
};
