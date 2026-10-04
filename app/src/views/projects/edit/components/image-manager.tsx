"use client";

import { useMemo, useRef, useState, type FC } from "react";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext, arrayMove, rectSortingStrategy, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { InfoIcon, UploadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfirmationDialog from "@/components/ui/confirmation-dialog";
import { UploadProgressList } from "@/components/ui/upload-progress-list";
import {
  useDeleteImage,
  useImageUploader,
  useRemoveWatermark,
  useReorderImages,
  useUpdateImage,
} from "@/features/images/hooks/use-images";
import type { ProjectImage } from "@/features/images/interfaces/images.interfaces";
import { ACCEPT_ATTRIBUTE, prepareUploadBatch } from "@/features/images/utils/image-validation";
import type { Project } from "@/features/projects/interfaces/projects.interfaces";
import { toast } from "@/hooks/use-toast";
import { VideoLimits } from "@/lib/format.utils";
import { cn } from "@/lib/utils";
import { ImageCard } from "@/views/projects/edit/components/image-card";
import { ImageLightbox } from "@/views/projects/edit/components/image-lightbox";
import { UploadTile } from "@/views/projects/edit/components/upload-tile";
import { WatermarkConsentDialog } from "@/views/projects/edit/components/watermark-consent-dialog";

interface ImageManagerProps {
  project: Project;
}

export const ImageManager: FC<ImageManagerProps> = ({ project }) => {
  const projectId = project.id;
  const serverImages = useMemo(() => [...(project.images ?? [])].sort((a, b) => a.position - b.position), [project.images]);
  const total = serverImages.length;

  // Local order is applied synchronously on drop so the grid never snaps back while the PATCH is in flight.
  const [localOrder, setLocalOrder] = useState<string[] | null>(null);
  const images = useMemo(() => {
    if (!localOrder) return serverImages;
    const byId = new Map(serverImages.map((image) => [image.id, image]));
    const ordered = localOrder.map((id) => byId.get(id)).filter((image): image is ProjectImage => !!image);
    // Images that arrived meanwhile (e.g. a finished upload) are appended.
    const extras = serverImages.filter((image) => !localOrder.includes(image.id));
    return [...ordered, ...extras];
  }, [serverImages, localOrder]);

  const reorder = useReorderImages(projectId);
  const updateImage = useUpdateImage(projectId);
  const deleteImage = useDeleteImage(projectId);
  const removeWatermark = useRemoveWatermark(projectId);
  const uploader = useImageUploader();

  const [previewId, setPreviewId] = useState<string | null>(null);
  const [removing, setRemoving] = useState<ProjectImage | null>(null);
  const [consentFor, setConsentFor] = useState<ProjectImage | null>(null);
  const headerInputRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const persistOrder = (ids: string[]) => {
    setLocalOrder(ids);
    reorder.mutate(ids, { onSettled: () => setLocalOrder(null) });
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    const ids = images.map((image) => image.id);
    const from = ids.indexOf(String(active.id));
    const to = ids.indexOf(String(over.id));
    if (from < 0 || to < 0) return;
    persistOrder(arrayMove(ids, from, to));
  };

  const handleMove = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= images.length) return;
    persistOrder(arrayMove(images.map((image) => image.id), index, target));
  };

  const startWatermarkRemoval = (image: ProjectImage) => {
    if (!project.watermark_consent) {
      setConsentFor(image);
      return;
    }
    removeWatermark.mutate({ id: image.id, dto: {} });
  };

  const confirmConsent = () => {
    if (!consentFor) return;
    removeWatermark.mutate(
      { id: consentFor.id, dto: { accept_terms: true } },
      { onSettled: () => setConsentFor(null) },
    );
  };

  const handleFiles = async (files: File[]) => {
    const remaining = VideoLimits.maxImages - total;
    if (remaining <= 0) {
      toast({ title: "Maximum reached", description: `A video can use up to ${VideoLimits.maxImages} photos. Remove one to add another.`, variant: "warning" });
      return;
    }
    const { valid, rejected, warnings } = await prepareUploadBatch(files, remaining);
    try {
      await uploader.upload({ projectId, files: valid, rejected, warnings });
    } catch {
      // The mutation already toasts; the list keeps the per-file state.
    }
  };

  const under = total < VideoLimits.minImages;
  const over = total > VideoLimits.maxImages;
  const helper = under
    ? `Add at least ${VideoLimits.minImages} photos to continue.`
    : over
      ? `Remove ${total - VideoLimits.maxImages} to continue (max ${VideoLimits.maxImages}).`
      : "Drag the handle to reorder, or use the arrows. The video follows this order.";

  const previewImage = images.find((image) => image.id === previewId) ?? null;
  const previewPosition = previewImage ? images.indexOf(previewImage) + 1 : 0;
  const uploadFinished = uploader.items.length > 0 && !uploader.isUploading;

  return (
    <section aria-labelledby="photos-heading">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 id="photos-heading" className="text-[1.375rem] font-medium leading-snug text-ink">
            {total} of {VideoLimits.maxImages} photos
          </h2>
          <p className={cn("flex items-center gap-1.5 text-sm", under || over ? "text-ink" : "text-muted-foreground")} aria-live="polite">
            {under || over ? <InfoIcon className="size-4 shrink-0 text-warning" aria-hidden="true" /> : null}
            {helper}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => headerInputRef.current?.click()}
          disabled={uploader.isUploading || total >= VideoLimits.maxImages}
        >
          <UploadIcon /> Upload photos
        </Button>
        <input
          ref={headerInputRef}
          type="file"
          accept={ACCEPT_ATTRIBUTE}
          multiple
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
          onChange={(event) => {
            const files = Array.from(event.target.files ?? []);
            event.target.value = "";
            if (files.length) void handleFiles(files);
          }}
        />
      </div>

      {project.failure_reason && total === 0 ? (
        <p className="mb-4 rounded-md bg-notice-warn px-4 py-3 text-sm text-ink">{project.failure_reason}</p>
      ) : null}

      {uploader.items.length > 0 ? (
        <div className="mb-4">
          <UploadProgressList items={uploader.items} />
          {uploadFinished ? (
            <Button variant="ghost" size="sm" className="mt-2" onClick={uploader.reset}>
              Clear list
            </Button>
          ) : null}
        </div>
      ) : null}

      {total === 0 ? (
        <div className="mb-4 rounded-lg border border-dashed border-hairline px-6 py-10 text-center">
          <p className="text-lg font-medium text-ink">Add at least {VideoLimits.minImages} photos to continue.</p>
          <p className="mt-1 text-muted-foreground">Upload your own photos using the tile below.</p>
        </div>
      ) : null}

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={images.map((image) => image.id)} strategy={rectSortingStrategy}>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {images.map((image, index) => (
              <ImageCard
                key={image.id}
                image={image}
                index={index}
                total={total}
                onMove={(direction) => handleMove(index, direction)}
                onRemove={() => setRemoving(image)}
                onPreview={() => setPreviewId(image.id)}
                onRoomChange={(room) => updateImage.mutate({ id: image.id, dto: { room_type: room } })}
                onRemoveWatermark={() => startWatermarkRemoval(image)}
                onUseProcessed={(useProcessed) => updateImage.mutate({ id: image.id, dto: { use_processed: useProcessed } })}
              />
            ))}
            <UploadTile onFiles={handleFiles} full={total >= VideoLimits.maxImages} busy={uploader.isUploading} />
          </ul>
        </SortableContext>
      </DndContext>

      <ImageLightbox image={previewImage} position={previewPosition} onClose={() => setPreviewId(null)} />

      <WatermarkConsentDialog
        isOpen={!!consentFor}
        isLoading={removeWatermark.isPending}
        onClose={() => setConsentFor(null)}
        onConfirm={confirmConsent}
      />

      <ConfirmationDialog
        isOpen={!!removing}
        onClose={() => setRemoving(null)}
        title="Remove this photo?"
        description="It will no longer be used in the video. It stays in storage until you delete the project, and you can upload it again any time."
        confirmText="Remove photo"
        variant="destructive"
        isLoading={deleteImage.isPending}
        onConfirm={() => removing && deleteImage.mutate(removing.id, { onSettled: () => setRemoving(null) })}
      />
    </section>
  );
};
