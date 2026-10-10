"use client";

import { useCallback, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getApiErrorMessage } from "@/config/constants/dropdowns/shared/api-error-message.options";
import {
  UploadItemStatuses,
  type ImageDownloadVersion,
  type ProjectImage,
  type UploadItem,
  type UploadSummary,
} from "@/features/images/interfaces/images.interfaces";
import {
  confirmImages,
  deleteImage,
  getImageDownloadUrl,
  putFileToSignedUrl,
  removeWatermark,
  reorderImages,
  requestUploadUrls,
  updateImage,
} from "@/features/images/services/images.services";
import { PROJECT_QUERY_KEY, PROJECTS_QUERY_KEY } from "@/features/projects/hooks/use-projects";
import type { Project } from "@/features/projects/interfaces/projects.interfaces";
import { AnalyticsEvents, trackEvent } from "@/lib/analytics.utils";
import { toast } from "@/hooks/use-toast";
import { triggerDownload } from "@/lib/download.utils";
import { pluralize } from "@/lib/format.utils";

function patchProjectImages(project: Project | undefined, transform: (images: ProjectImage[]) => ProjectImage[]) {
  if (!project?.images) return project;
  const images = transform(project.images);
  return { ...project, images, image_count: images.length };
}

const repack = (images: ProjectImage[]): ProjectImage[] => images.map((image, index) => ({ ...image, position: index + 1 }));

/** Optimistic reorder: UI updates immediately, rolls back and toasts if the API rejects it. */
export const useReorderImages = (projectId: string) => {
  const queryClient = useQueryClient();
  const key = [PROJECT_QUERY_KEY, projectId];
  return useMutation({
    mutationFn: (imageIds: string[]) => reorderImages({ projectId, dto: { image_ids: imageIds } }),
    onMutate: async (imageIds) => {
      await queryClient.cancelQueries({ queryKey: key });
      const previous = queryClient.getQueryData<Project>(key);
      queryClient.setQueryData<Project>(key, (current) =>
        patchProjectImages(current, (images) => {
          const byId = new Map(images.map((image) => [image.id, image]));
          const ordered = imageIds.map((id) => byId.get(id)).filter((image): image is ProjectImage => !!image);
          return repack(ordered);
        }),
      );
      return { previous };
    },
    onSuccess: () => {
      toast({ title: "Order saved", description: "The video follows this order.", duration: 1500 });
    },
    onError: (error, _ids, context) => {
      if (context?.previous) queryClient.setQueryData(key, context.previous);
      toast({ title: "Could not save the new order", description: getApiErrorMessage(error), variant: "error" });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [PROJECT_QUERY_KEY] });
    },
  });
};

export const useUpdateImage = (projectId: string) => {
  const queryClient = useQueryClient();
  const key = [PROJECT_QUERY_KEY, projectId];
  return useMutation({
    mutationFn: updateImage,
    onMutate: async ({ id, dto }) => {
      await queryClient.cancelQueries({ queryKey: key });
      const previous = queryClient.getQueryData<Project>(key);
      queryClient.setQueryData<Project>(key, (current) =>
        patchProjectImages(current, (images) => images.map((image) => (image.id === id ? { ...image, ...dto } : image))),
      );
      return { previous };
    },
    onSuccess: (updated, { dto }) => {
      queryClient.setQueryData<Project>(key, (current) =>
        patchProjectImages(current, (images) => images.map((image) => (image.id === updated.id ? updated : image))),
      );
      toast({
        title: dto.use_processed !== undefined ? (dto.use_processed ? "Using the cleaned photo" : "Using the original photo") : "Room type updated",
        duration: 1500,
      });
    },
    onError: (error, _vars, context) => {
      if (context?.previous) queryClient.setQueryData(key, context.previous);
      toast({ title: "Could not update the photo", description: getApiErrorMessage(error), variant: "error" });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [PROJECT_QUERY_KEY] });
    },
  });
};

export const useDeleteImage = (projectId: string) => {
  const queryClient = useQueryClient();
  const key = [PROJECT_QUERY_KEY, projectId];
  return useMutation({
    mutationFn: deleteImage,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: key });
      const previous = queryClient.getQueryData<Project>(key);
      queryClient.setQueryData<Project>(key, (current) =>
        patchProjectImages(current, (images) => repack(images.filter((image) => image.id !== id))),
      );
      return { previous };
    },
    onSuccess: () => {
      toast({ title: "Photo removed", description: "It stays in storage until you delete the project.", duration: 2500 });
    },
    onError: (error, _id, context) => {
      if (context?.previous) queryClient.setQueryData(key, context.previous);
      toast({ title: "Could not remove the photo", description: getApiErrorMessage(error), variant: "error" });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [PROJECT_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [PROJECTS_QUERY_KEY] });
    },
  });
};

export const useRemoveWatermark = (projectId: string) => {
  const queryClient = useQueryClient();
  const key = [PROJECT_QUERY_KEY, projectId];
  return useMutation({
    mutationFn: removeWatermark,
    onSuccess: (updated) => {
      trackEvent(AnalyticsEvents.WATERMARK_REMOVAL_STARTED);
      queryClient.setQueryData<Project>(key, (current) => {
        const next = patchProjectImages(current, (images) => images.map((image) => (image.id === updated.id ? updated : image)));
        return next ? { ...next, watermark_consent: true } : next;
      });
      queryClient.invalidateQueries({ queryKey: [PROJECT_QUERY_KEY] });
      toast({ title: "Removing the watermark", description: "This usually takes under 30 seconds. You can keep editing.", duration: 3500 });
    },
    onError: (error) => {
      queryClient.invalidateQueries({ queryKey: [PROJECT_QUERY_KEY] });
      toast({ title: "Could not remove the watermark", description: getApiErrorMessage(error), variant: "error" });
    },
  });
};

export const useDownloadImage = () => {
  return useMutation({
    mutationFn: (vars: { id: string; version: ImageDownloadVersion }) => getImageDownloadUrl(vars),
    onSuccess: (download) => {
      triggerDownload(download.url, download.filename);
      toast({ title: "Download started", description: download.filename, duration: 2500 });
    },
    onError: (error) => {
      toast({ title: "Could not start the download", description: getApiErrorMessage(error), variant: "error" });
    },
  });
};

interface UploadVariables {
  projectId: string;
  files: File[];
  /** Files rejected by client-side validation, shown in the list with their reason. */
  rejected?: { file: File; message: string }[];
  warnings?: string[];
}

const UPLOAD_CONCURRENCY = 3;
let itemCounter = 0;
const nextItemId = () => `upload-${Date.now()}-${itemCounter++}`;

/**
 * Signed-URL upload: request URLs, PUT each file straight to GCS with per-file progress, then confirm.
 * Exposes the per-file list so the UI can render progress and rejection reasons.
 */
export const useImageUploader = () => {
  const queryClient = useQueryClient();
  const [items, setItems] = useState<UploadItem[]>([]);
  const itemsRef = useRef<UploadItem[]>([]);

  const commit = useCallback((updater: (current: UploadItem[]) => UploadItem[]) => {
    itemsRef.current = updater(itemsRef.current);
    setItems(itemsRef.current);
  }, []);

  const patchItem = useCallback(
    (id: string, changes: Partial<UploadItem>) => {
      commit((current) => current.map((item) => (item.id === id ? { ...item, ...changes } : item)));
    },
    [commit],
  );

  const reset = useCallback(() => commit(() => []), [commit]);

  const mutation = useMutation({
    mutationFn: async ({ projectId, files, rejected = [], warnings = [] }: UploadVariables): Promise<UploadSummary> => {
      const rejectedItems: UploadItem[] = rejected.map(({ file, message }) => ({
        id: nextItemId(),
        name: file.name,
        size: file.size,
        status: UploadItemStatuses.REJECTED,
        progress: 0,
        message,
      }));
      const queued = files.map((file) => ({ file, id: nextItemId() }));
      commit(() => [
        ...rejectedItems,
        ...queued.map(
          ({ file, id }): UploadItem => ({ id, name: file.name, size: file.size, status: UploadItemStatuses.QUEUED, progress: 0 }),
        ),
      ]);

      const summary: UploadSummary = { uploaded: 0, rejected: rejectedItems.length, failed: 0, warnings };
      if (queued.length === 0) return summary;

      const entries = await requestUploadUrls({
        projectId,
        dto: { files: queued.map(({ file }) => ({ filename: file.name, content_type: file.type, size: file.size })) },
      }).catch((error) => {
        queued.forEach(({ id }) => patchItem(id, { status: UploadItemStatuses.ERROR, message: getApiErrorMessage(error) }));
        throw error;
      });

      const uploadedIds = new Map<string, string>(); // image_id -> item id
      let cursor = 0;
      const worker = async () => {
        while (cursor < queued.length) {
          const index = cursor++;
          const { file, id } = queued[index];
          const entry = entries[index];
          if (!entry) {
            patchItem(id, { status: UploadItemStatuses.ERROR, message: "No upload slot was issued for this photo." });
            summary.failed++;
            continue;
          }
          patchItem(id, { status: UploadItemStatuses.UPLOADING });
          try {
            await putFileToSignedUrl(entry, file, (progress) => patchItem(id, { progress }));
            uploadedIds.set(entry.image_id, id);
            patchItem(id, { status: UploadItemStatuses.CONFIRMING, progress: 100 });
          } catch (error) {
            summary.failed++;
            patchItem(id, { status: UploadItemStatuses.ERROR, message: getApiErrorMessage(error) });
          }
        }
      };
      await Promise.all(Array.from({ length: Math.min(UPLOAD_CONCURRENCY, queued.length) }, worker));

      if (uploadedIds.size > 0) {
        try {
          const result = await confirmImages({ projectId, dto: { image_ids: [...uploadedIds.keys()] } });
          const rejectedById = new Map(result.rejected.map((entry) => [entry.image_id, entry]));
          uploadedIds.forEach((itemId, imageId) => {
            const rejection = rejectedById.get(imageId);
            if (rejection) {
              summary.rejected++;
              patchItem(itemId, { status: UploadItemStatuses.REJECTED, message: rejection.message });
            } else {
              summary.uploaded++;
              patchItem(itemId, { status: UploadItemStatuses.DONE });
            }
          });
        } catch (error) {
          uploadedIds.forEach((itemId) => {
            summary.failed++;
            patchItem(itemId, { status: UploadItemStatuses.ERROR, message: getApiErrorMessage(error) });
          });
          throw error;
        }
      }
      return summary;
    },
    onSuccess: (summary) => {
      if (summary.uploaded > 0) trackEvent(AnalyticsEvents.PHOTOS_UPLOADED, { count: summary.uploaded });
      queryClient.invalidateQueries({ queryKey: [PROJECT_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [PROJECTS_QUERY_KEY] });
      const problems = summary.rejected + summary.failed;
      if (summary.uploaded > 0) {
        toast({
          title: `${pluralize(summary.uploaded, "photo")} added`,
          description: problems > 0 ? `${pluralize(problems, "photo")} could not be used. See the list for details.` : summary.warnings[0],
          variant: problems > 0 || summary.warnings.length > 0 ? "warning" : "success",
        });
      } else if (problems > 0) {
        toast({ title: "No photos were added", description: "See the list for the reason for each photo.", variant: "error" });
      }
    },
    onError: (error) => {
      queryClient.invalidateQueries({ queryKey: [PROJECT_QUERY_KEY] });
      toast({ title: "Upload failed", description: getApiErrorMessage(error), variant: "error" });
    },
  });

  return {
    items,
    reset,
    isUploading: mutation.isPending,
    upload: mutation.mutateAsync,
  };
};
