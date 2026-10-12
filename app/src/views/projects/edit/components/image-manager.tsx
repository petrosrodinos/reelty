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
import { EraserIcon, InfoIcon, Trash2Icon, UploadIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfirmationDialog from "@/components/ui/confirmation-dialog";
import { UploadProgressList } from "@/components/ui/upload-progress-list";
import {
  useDeleteImages,
  useImageUploader,
  useRemoveWatermark,
  useReorderImages,
  useUpdateImage,
} from "@/features/images/hooks/use-images";
import { useVideoLimits } from "@/features/credits/hooks/use-credits";
import { UploadItemStatuses, WatermarkStatuses, type ProjectImage, type UploadItem } from "@/features/images/interfaces/images.interfaces";
import { ACCEPT_ATTRIBUTE, prepareUploadBatch } from "@/features/images/utils/image-validation";
import type { Project } from "@/features/projects/interfaces/projects.interfaces";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { ImageCard } from "@/views/projects/edit/components/image-card";
import { ImageCardSkeleton } from "@/views/projects/edit/components/image-card-skeleton";
import { ImageLightbox } from "@/views/projects/edit/components/image-lightbox";
import { UploadTile } from "@/views/projects/edit/components/upload-tile";

interface ImageManagerProps {
  project: Project;
  /** Photos the current balance pays for; undefined while pricing loads. */
  affordablePhotos?: number;
  /** The balance cannot pay the watermark-removal add-on: removing opens the buy-credits modal instead. */
  watermarkNeedsCredits: boolean;
  /** Opens the buy-credits modal (owned by the editor so the summary panel can open it too). */
  onBuyCredits: () => void;
}

export const ImageManager: FC<ImageManagerProps> = ({ project, affordablePhotos, watermarkNeedsCredits, onBuyCredits }) => {
  const projectId = project.id;
  const serverImages = useMemo(() => [...(project.images ?? [])].sort((a, b) => a.position - b.position), [project.images]);
  const total = serverImages.length;
  const limits = useVideoLimits();

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
  const deleteImages = useDeleteImages(projectId);
  const bulkDeleteImages = useDeleteImages(projectId, { quiet: true });
  const removeWatermark = useRemoveWatermark(projectId);
  const uploader = useImageUploader();

  const [previewId, setPreviewId] = useState<string | null>(null);
  const [removing, setRemoving] = useState<ProjectImage | null>(null);
  const [bulkDeleting, setBulkDeleting] = useState(false);
  const [bulkBusy, setBulkBusy] = useState(false);
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
    if (watermarkNeedsCredits) {
      onBuyCredits();
      return;
    }
    removeWatermark.mutate({ id: image.id, dto: {} });
  };

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const isEligible = (image: ProjectImage) =>
    (image.wm_status === WatermarkStatuses.NONE || image.wm_status === WatermarkStatuses.FAILED) && image.wm_attempts < image.wm_max_attempts;
  const allIds = images.map((image) => image.id);
  // The selection is shared by both bulk actions; photos that no longer exist drop out of it on their own.
  const selectedAll = allIds.filter((id) => selectedIds.has(id));
  const allSelected = allIds.length > 0 && selectedAll.length === allIds.length;
  // Photos that started processing or ran out of attempts cannot be sent to watermark removal.
  const selectedEligible = images.filter((image) => selectedIds.has(image.id) && isEligible(image)).map((image) => image.id);

  const toggleSelected = (id: string, selected: boolean) =>
    setSelectedIds((current) => {
      const next = new Set(current);
      if (selected) next.add(id);
      else next.delete(id);
      return next;
    });

  const removeSelectedWatermarks = () => {
    if (watermarkNeedsCredits) {
      onBuyCredits();
      return;
    }
    const ids = selectedEligible;
    setSelectedIds(new Set());
    ids.forEach((id) => removeWatermark.mutate({ id, dto: {}, quiet: true }));
    toast({
      title: `Removing the watermark from ${ids.length} ${ids.length === 1 ? "photo" : "photos"}`,
      description: "This usually takes under 30 seconds. You can keep editing.",
      duration: 3500,
    });
  };

  const deleteSelected = async () => {
    const ids = selectedAll;
    setBulkBusy(true);
    let removed = 0;
    try {
      await bulkDeleteImages.mutateAsync(ids);
      removed = ids.length;
    } catch {
      // the mutation already toasted the error
    }
    setSelectedIds(new Set());
    setBulkBusy(false);
    setBulkDeleting(false);
    if (removed > 0) {
      toast({
        title: `${removed} ${removed === 1 ? "photo" : "photos"} removed`,
        description: "They stay in storage until you delete the project.",
        duration: 2500,
      });
    }
  };

  // Credits cap the photo count below the tier maximum; at the cap, uploading means buying credits first.
  const cap = Math.min(limits.maxImages, affordablePhotos ?? limits.maxImages);
  const creditLimited = cap < limits.maxImages;
  const needsCredits = creditLimited && total >= cap;
  // The native picker has no max count; with a single slot left, single-select is the only enforceable limit.
  const singleSlot = cap - total === 1;

  const openPicker = () => {
    if (needsCredits) onBuyCredits();
    else headerInputRef.current?.click();
  };

  const handleFiles = async (picked: File[]) => {
    if (needsCredits) {
      onBuyCredits();
      return;
    }
    const remaining = cap - total;
    if (remaining <= 0) {
      toast({ title: "Maximum reached", description: `A video can use up to ${limits.maxImages} photos. Remove one to add another.`, variant: "warning" });
      return;
    }
    let files = picked;
    if (creditLimited && files.length > remaining) {
      toast({
        title: "Not enough credits for all of them",
        description: `Your credits cover ${remaining} more ${remaining === 1 ? "photo" : "photos"}, so only the first ${remaining} were added. Buy credits to add more.`,
        variant: "warning",
      });
      files = files.slice(0, remaining);
    }
    const { valid, rejected, warnings } = await prepareUploadBatch(files, remaining, limits.maxImages);
    try {
      await uploader.upload({ projectId, files: valid, rejected, warnings });
    } catch {
      // The mutation already toasts; the list keeps the per-file state.
    }
  };

  const under = total < limits.minImages;
  const over = total > limits.maxImages;
  // Credits allow fewer photos than the tier maximum and the video already has more than that.
  const overCredits = creditLimited && !over && total > cap;
  const helper = under
    ? `Add at least ${limits.minImages} photos to continue.`
    : over
      ? `Remove ${total - limits.maxImages} to continue (max ${limits.maxImages}).`
      : overCredits
        ? `Your credits only cover ${cap} ${cap === 1 ? "photo" : "photos"}. Remove ${total - cap} or buy credits to continue.`
        : creditLimited
          ? needsCredits
            ? `Your credits only cover ${cap} ${cap === 1 ? "photo" : "photos"}. Buy credits to add more.`
            : `Your credits cover ${cap} ${cap === 1 ? "photo" : "photos"} (you can add ${cap - total} more). Buy credits to add more.`
          : "Drag the handle to reorder, or use the arrows. The video follows this order.";
  const creditWarning = creditLimited && !over;

  const previewImage = images.find((image) => image.id === previewId) ?? null;
  const previewPosition = previewImage ? images.indexOf(previewImage) + 1 : 0;
  // In-flight photos render as skeleton cards in the grid; only failures keep a text reason.
  const isFailed = (item: UploadItem) => item.status === UploadItemStatuses.REJECTED || item.status === UploadItemStatuses.ERROR;
  const pendingItems = uploader.isUploading ? uploader.items.filter((item) => !isFailed(item)) : [];
  const failedItems = uploader.items.filter(isFailed);
  const uploadFinished = failedItems.length > 0 && !uploader.isUploading;

  return (
    <section aria-labelledby="photos-heading">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2
            id="photos-heading"
            className={cn("text-[1.375rem] font-medium leading-snug", over || overCredits ? "font-semibold text-destructive" : "text-ink")}
          >
            {total} of {cap} photos
          </h2>
          <p
            className={cn(
              "flex items-center gap-1.5 text-sm",
              over || overCredits
                ? "font-semibold text-destructive"
                : creditWarning
                  ? "font-semibold text-warning"
                  : under
                    ? "text-ink"
                    : "text-muted-foreground",
            )}
            aria-live="polite"
          >
            {under || over || creditWarning ? (
              <InfoIcon className={cn("size-4 shrink-0", over || overCredits ? "text-destructive" : "text-warning")} aria-hidden="true" />
            ) : null}
            {helper}
          </p>
        </div>
        <Button
          variant="outline"
          className="max-sm:w-full"
          onClick={openPicker}
          disabled={uploader.isUploading}
        >
          <UploadIcon /> Upload photos
        </Button>
        <input
          ref={headerInputRef}
          type="file"
          accept={ACCEPT_ATTRIBUTE}
          multiple={!singleSlot}
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

      {failedItems.length > 0 ? (
        <div className="mb-4">
          <UploadProgressList items={failedItems} />
          {uploadFinished ? (
            <Button variant="ghost" size="sm" className="mt-2" onClick={uploader.reset}>
              Clear list
            </Button>
          ) : null}
        </div>
      ) : null}

      {total === 0 ? (
        <div className="mb-4 rounded-lg border border-dashed border-hairline px-6 py-10 text-center">
          <p className="text-lg font-medium text-ink">Add at least {limits.minImages} photos to continue.</p>
          <p className="mt-1 text-muted-foreground">Upload your own photos using the tile below.</p>
        </div>
      ) : null}

      {total > 0 ? (
        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
          <Button variant="outline" size="sm" onClick={() => setSelectedIds(allSelected ? new Set() : new Set(allIds))}>
            {allSelected ? "Unselect all" : "Select all"}
          </Button>
          {selectedEligible.length > 0 ? (
            <Button size="sm" className="max-sm:w-full" onClick={removeSelectedWatermarks}>
              <EraserIcon /> Remove watermark from {selectedEligible.length} {selectedEligible.length === 1 ? "photo" : "photos"}
            </Button>
          ) : null}
          {selectedAll.length > 0 ? (
            <Button variant="destructive" size="sm" className="max-sm:w-full" onClick={() => setBulkDeleting(true)}>
              <Trash2Icon /> Delete {selectedAll.length} {selectedAll.length === 1 ? "photo" : "photos"}
            </Button>
          ) : null}
        </div>
      ) : null}

      {over || overCredits ? (
        <p className="mb-3 flex items-start gap-2 rounded-md border border-destructive/40 bg-destructive/10 p-2.5 text-sm text-destructive" role="status">
          <Trash2Icon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <span>
            <strong className="font-semibold">Remove {total - (over ? limits.maxImages : cap)} {total - (over ? limits.maxImages : cap) === 1 ? "photo" : "photos"}.</strong>{" "}
            Click photos to select them, then press <strong className="font-semibold">Delete</strong> above, or click the <XIcon className="mx-0.5 inline size-3.5 align-[-2px]" aria-hidden="true" /> in a photo&apos;s top-right corner.
          </span>
        </p>
      ) : null}

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={images.map((image) => image.id)} strategy={rectSortingStrategy}>
          <ul className="grid grid-cols-1 gap-3 min-[26rem]:grid-cols-2 sm:grid-cols-3 md:gap-4 lg:grid-cols-2 xl:grid-cols-3">
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
                selected={selectedIds.has(image.id)}
                onSelectChange={(selected) => toggleSelected(image.id, selected)}
                onUseProcessed={(useProcessed) => updateImage.mutate({ id: image.id, dto: { use_processed: useProcessed } })}
              />
            ))}
            {pendingItems.map((item) => (
              <ImageCardSkeleton key={item.id} item={item} />
            ))}
            <UploadTile
              onFiles={handleFiles}
              full={total >= limits.maxImages}
              busy={uploader.isUploading}
              maxImages={limits.maxImages}
              single={singleSlot}
              needsCredits={needsCredits}
              onBuyCredits={onBuyCredits}
            />
          </ul>
        </SortableContext>
      </DndContext>

      <ImageLightbox image={previewImage} position={previewPosition} onClose={() => setPreviewId(null)} />

      <ConfirmationDialog
        isOpen={bulkDeleting}
        onClose={() => setBulkDeleting(false)}
        title={`Remove ${selectedAll.length} ${selectedAll.length === 1 ? "photo" : "photos"}?`}
        description="They will no longer be used in the video. They stay in storage until you delete the project, and you can upload them again any time."
        confirmText="Remove photos"
        variant="destructive"
        isLoading={bulkBusy}
        onConfirm={() => void deleteSelected()}
      />

      <ConfirmationDialog
        isOpen={!!removing}
        onClose={() => setRemoving(null)}
        title="Remove this photo?"
        description="It will no longer be used in the video. It stays in storage until you delete the project, and you can upload it again any time."
        confirmText="Remove photo"
        variant="destructive"
        isLoading={deleteImages.isPending}
        onConfirm={() => removing && deleteImages.mutate([removing.id], { onSettled: () => setRemoving(null) })}
      />
    </section>
  );
};
