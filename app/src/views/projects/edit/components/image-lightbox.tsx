"use client";

import type { FC } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RoomTypeFormOptions } from "@/config/constants/dropdowns/images/room-type-form.options";
import type { ProjectImage } from "@/features/images/interfaces/images.interfaces";
import { getDropdownOptionLabel } from "@/lib/dropdown-option-label.utils";

interface ImageLightboxProps {
  image: ProjectImage | null;
  position: number;
  onClose: () => void;
}

/** Large preview. With a processed version it shows original and cleaned side by side (FR-IMG-9). */
export const ImageLightbox: FC<ImageLightboxProps> = ({ image, position, onClose }) => {
  const hasProcessed = !!image?.has_processed && !!image.processed_url;
  const original = image?.original_url ?? image?.thumb_url ?? null;

  return (
    <Dialog open={!!image} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[calc(100%-1.5rem)] sm:max-w-5xl">
        <DialogHeader>
          <DialogTitle>Photo {position} preview</DialogTitle>
          <DialogDescription>
            {image
              ? hasProcessed
                ? `The video uses the ${image.use_processed ? "cleaned version" : "original"}. The original is always kept in storage.`
                : `Room type: ${getDropdownOptionLabel(RoomTypeFormOptions, image.room_type)}`
              : ""}
          </DialogDescription>
        </DialogHeader>
        {image ? (
          <div className={hasProcessed ? "grid gap-4 md:grid-cols-2" : "grid gap-4"}>
            <figure className="m-0">
              <figcaption className="mb-1.5 text-[0.8125rem] font-medium text-muted-foreground">{hasProcessed ? "Original" : "Photo"}</figcaption>
              {original ? (
                <img src={original} alt={`Photo ${position}, original`} className="max-h-[70dvh] w-full rounded-md bg-surface-card object-contain" />
              ) : null}
            </figure>
            {hasProcessed ? (
              <figure className="m-0">
                <figcaption className="mb-1.5 text-[0.8125rem] font-medium text-muted-foreground">Watermark removed</figcaption>
                <img src={image.processed_url ?? ""} alt={`Photo ${position}, watermark removed`} className="max-h-[70dvh] w-full rounded-md bg-surface-card object-contain" />
              </figure>
            ) : null}
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};
