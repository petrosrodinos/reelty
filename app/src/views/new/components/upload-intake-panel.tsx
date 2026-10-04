"use client";

import { useRef, type FC } from "react";
import { useRouter } from "next/navigation";
import { UploadIcon } from "lucide-react";
import { Dropzone } from "@/components/ui/dropzone";
import { UploadProgressList } from "@/components/ui/upload-progress-list";
import { useImageUploader } from "@/features/images/hooks/use-images";
import { ACCEPT_ATTRIBUTE, prepareUploadBatch } from "@/features/images/utils/image-validation";
import { useCreateProject } from "@/features/projects/hooks/use-projects";
import { SourceTypes } from "@/features/projects/interfaces/projects.interfaces";
import { VideoLimits } from "@/lib/format.utils";
import { Routes } from "@/routes/routes";

export const UploadIntakePanel: FC = () => {
  const router = useRouter();
  const createProject = useCreateProject();
  const uploader = useImageUploader();
  // Keep the project across retries so a failed upload never creates a second draft.
  const projectIdRef = useRef<string | null>(null);
  const busy = createProject.isPending || uploader.isUploading;

  const handleFiles = async (files: File[]) => {
    const { valid, rejected, warnings } = await prepareUploadBatch(files, VideoLimits.maxImages);

    if (valid.length === 0) {
      // Nothing to upload: show the reasons without creating a project.
      await uploader.upload({ projectId: "", files: [], rejected });
      return;
    }

    try {
      if (!projectIdRef.current) {
        const project = await createProject.mutateAsync({ source_type: SourceTypes.UPLOAD });
        projectIdRef.current = project.id;
      }
      const summary = await uploader.upload({
        projectId: projectIdRef.current,
        files: valid,
        rejected,
        warnings,
      });
      if (summary.uploaded > 0) router.push(Routes.edit(projectIdRef.current));
    } catch {
      // Both mutations already toast their own errors; the list shows per-file state.
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-[1.375rem] font-medium leading-snug text-ink">Upload your own photos</h2>
        <p className="mt-1 text-muted-foreground">
          JPG, PNG or WebP. Up to 20 MB each. Best results at 1024 px or larger on the long side.
        </p>
      </div>
      <Dropzone
        onFiles={handleFiles}
        accept={ACCEPT_ATTRIBUTE}
        disabled={busy}
        label="Add photos: drag them here or press Enter to browse"
        className="px-6 py-12 sm:py-14"
      >
        <UploadIcon className="mx-auto size-8 text-brand" aria-hidden="true" />
        <p className="mt-3 text-lg font-medium text-ink">Drag photos here or click to browse</p>
        <p className="mt-1 text-sm text-muted-foreground">Minimum 640 px, 3 to 12 photos per video</p>
      </Dropzone>
      <UploadProgressList items={uploader.items} />
    </div>
  );
};
