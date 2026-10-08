"use client";

import type { FC } from "react";
import { PlusIcon } from "lucide-react";
import { Dropzone } from "@/components/ui/dropzone";
import { ACCEPT_ATTRIBUTE } from "@/features/images/utils/image-validation";

interface UploadTileProps {
  onFiles: (files: File[]) => void;
  full: boolean;
  busy: boolean;
  /** Most photos a video can use (from the credit tiers). */
  maxImages: number;
}

/** Always-visible last tile in the grid. Disabled (with a reason) once the maximum is reached. */
export const UploadTile: FC<UploadTileProps> = ({ onFiles, full, busy, maxImages }) => (
  <li className="list-none">
    <Dropzone
      onFiles={onFiles}
      accept={ACCEPT_ATTRIBUTE}
      disabled={full || busy}
      label={full ? `Maximum of ${maxImages} photos reached` : "Upload more photos"}
      className="grid min-h-[220px] place-items-center p-4 text-muted-foreground"
    >
      <span>
        <PlusIcon className="mx-auto mb-2 size-7 text-brand" aria-hidden="true" />
        <span className="block text-base font-medium text-ink">{full ? "Maximum reached" : "Upload more"}</span>
        <span className="mt-0.5 block text-sm">{full ? `${maxImages} photos per video` : "JPG, PNG, WebP. Drop files here."}</span>
      </span>
    </Dropzone>
  </li>
);
