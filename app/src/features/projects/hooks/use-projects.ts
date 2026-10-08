"use client";

import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiError } from "@/config/api/axios";
import { getApiErrorMessage } from "@/config/constants/dropdowns/shared/api-error-message.options";
import { ME_QUERY_KEY } from "@/features/auth/hooks/use-auth";
import { USAGE_QUERY_KEY } from "@/features/usage/hooks/use-usage";
import { WatermarkStatuses } from "@/features/images/interfaces/images.interfaces";
import {
  InProgressStatuses,
  SourceTypes,
  type Project,
  type ProjectsQuery,
} from "@/features/projects/interfaces/projects.interfaces";
import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  getSoundtracks,
  getVideoDownloadUrl,
  getVideoPlayUrl,
  retryProject,
  submitProject,
  updateProject,
} from "@/features/projects/services/projects.services";
import { toast } from "@/hooks/use-toast";
import { triggerDownload } from "@/lib/download.utils";

export const PROJECTS_QUERY_KEY = "projects";
export const PROJECT_QUERY_KEY = "project";
export const SOUNDTRACKS_QUERY_KEY = "soundtracks";
export const VIDEO_PLAY_URL_QUERY_KEY = "video-play-url";

const POLL_INTERVAL_MS = 5000;
const WATERMARK_POLL_INTERVAL_MS = 3000;

/** Paginated library. Polls every 5 s while any visible project is fetching, queued or creating. */
export const useProjects = (query: ProjectsQuery = {}) => {
  return useQuery({
    queryKey: [PROJECTS_QUERY_KEY, query],
    queryFn: () => getProjects(query),
    placeholderData: keepPreviousData,
    refetchInterval: (q) =>
      q.state.data?.data.some((project) => InProgressStatuses.includes(project.status)) ? POLL_INTERVAL_MS : false,
  });
};

/** One project with images. Polls while the API is working on it (scrape, render, watermark removal). */
export const useProject = (id: string) => {
  return useQuery({
    queryKey: [PROJECT_QUERY_KEY, id],
    queryFn: () => getProject(id),
    enabled: !!id,
    retry: (failureCount, error) => !(error instanceof ApiError && error.status === 404) && failureCount < 2,
    refetchInterval: (q) => {
      const project = q.state.data;
      // after retries are exhausted the last good data is kept; don't keep hammering a failing endpoint
      if (!project || q.state.status === 'error') return false;
      if (InProgressStatuses.includes(project.status)) return POLL_INTERVAL_MS;
      if (project.images?.some((image) => image.wm_status === WatermarkStatuses.PROCESSING)) {
        return WATERMARK_POLL_INTERVAL_MS;
      }
      return false;
    },
  });
};

/** The built-in soundtrack catalog. Static on the server, so it is fetched once per session. */
export const useSoundtracks = () => {
  return useQuery({
    queryKey: [SOUNDTRACKS_QUERY_KEY],
    queryFn: getSoundtracks,
    staleTime: Infinity,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProject,
    onSuccess: (project) => {
      queryClient.invalidateQueries({ queryKey: [PROJECTS_QUERY_KEY] });
      toast(
        project.source_type === SourceTypes.UPLOAD
          ? { title: "Project created", description: "Uploading your photos.", duration: 2000 }
          : { title: "Fetching photos", description: "We are reading your listing. This takes a minute or two." },
      );
    },
    onError: (error) => {
      toast({ title: "Could not start your project", description: getApiErrorMessage(error), variant: "error" });
    },
  });
};

/** `silent` is for the debounced autosave of the details form: errors toast, success shows the inline indicator. */
export const useUpdateProject = (options: { silent?: boolean } = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProject,
    onSuccess: (updated, { id }) => {
      queryClient.setQueryData<Project>([PROJECT_QUERY_KEY, id], (current) =>
        current ? { ...current, ...updated, images: current.images } : current,
      );
      queryClient.invalidateQueries({ queryKey: [PROJECTS_QUERY_KEY] });
      if (!options.silent) toast({ title: "Saved", description: "Your video details were updated.", duration: 1800 });
    },
    onError: (error) => {
      toast({ title: "Could not save your changes", description: getApiErrorMessage(error), variant: "error" });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProject,
    onSuccess: (_data, id) => {
      queryClient.removeQueries({ queryKey: [PROJECT_QUERY_KEY, id] });
      queryClient.invalidateQueries({ queryKey: [PROJECTS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [USAGE_QUERY_KEY] });
      toast({ title: "Project deleted", description: "The video, poster and every photo were removed from storage." });
    },
    onError: (error) => {
      toast({ title: "Could not delete the project", description: getApiErrorMessage(error), variant: "error" });
    },
  });
};

export const useSubmitProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: submitProject,
    onSuccess: (project) => {
      queryClient.setQueryData<Project>([PROJECT_QUERY_KEY, project.id], (current) => ({
        ...project,
        images: project.images ?? current?.images,
      }));
      queryClient.invalidateQueries({ queryKey: [PROJECT_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [PROJECTS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [USAGE_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [ME_QUERY_KEY] });
    },
    onError: (error) => {
      if (error instanceof ApiError && (error.code === "email_not_verified" || error.code === "quota_exceeded")) {
        queryClient.invalidateQueries({ queryKey: [ME_QUERY_KEY] });
      }
      toast({ title: "Could not create your video", description: getApiErrorMessage(error), variant: "error" });
    },
  });
};

export const useRetryProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: retryProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PROJECT_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [PROJECTS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [USAGE_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [ME_QUERY_KEY] });
      toast({ title: "Re-queued", description: "We will continue from the last good step. Finished clips are kept." });
    },
    onError: (error) => {
      toast({ title: "Could not retry", description: getApiErrorMessage(error), variant: "error" });
    },
  });
};

/** Signed inline playback URL (15 min). Cached for 10 min, refetched on demand if the player errors. */
export const useVideoPlayUrl = (id: string, enabled: boolean) => {
  return useQuery({
    queryKey: [VIDEO_PLAY_URL_QUERY_KEY, id],
    queryFn: () => getVideoPlayUrl(id),
    enabled: enabled && !!id,
    staleTime: 10 * 60_000,
    gcTime: 10 * 60_000,
    retry: 1,
  });
};

export const useDownloadVideo = () => {
  return useMutation({
    mutationFn: getVideoDownloadUrl,
    onSuccess: (download) => {
      triggerDownload(download.url, download.filename);
      toast({ title: "Download started", description: "The signed link is valid for 15 minutes.", duration: 2500 });
    },
    onError: (error) => {
      toast({ title: "Could not start the download", description: getApiErrorMessage(error), variant: "error" });
    },
  });
};
