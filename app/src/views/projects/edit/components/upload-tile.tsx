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
  /** The balance pays for no more photos: the tile opens the buy-credits modal instead of the file picker. */
  needsCredits?: boolean;
  onBuyCredits?: () => void;
  /** One slot left: the picker only allows a single file. */
  single?: boolean;
}

/** Always-visible last tile in the grid. Disabled (with a reason) once the maximum is reached. */
export const UploadTile: FC<UploadTileProps> = ({ onFiles, full, busy, maxImages, needsCredits = false, onBuyCredits, single = false }) =>
  needsCredits && !full ? (
    <li className="list-none">
      <button
        type="button"
        onClick={onBuyCredits}
        className="grid min-h-[220px] w-full cursor-pointer place-items-center rounded-lg border-[1.5px] border-dashed border-muted-soft bg-canvas p-4 text-center text-muted-foreground outline-none transition-colors hover:bg-surface-soft focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <span>
          <PlusIcon className="mx-auto mb-2 size-7 text-brand" aria-hidden="true" />
          <span className="block text-base font-medium text-ink">Buy credits to add more</span>
          <span className="mt-0.5 block text-sm">Your credits cover no more photos.</span>
        </span>
      </button>
    </li>
  ) : (
  <li className="list-none">
    <Dropzone
      onFiles={onFiles}
      accept={ACCEPT_ATTRIBUTE}
      multiple={!single}
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
