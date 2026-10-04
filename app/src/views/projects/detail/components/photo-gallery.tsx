"use client";

import type { FC } from "react";
import { AlertTriangleIcon, DownloadIcon, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageDownloadVersionFormOptions } from "@/config/constants/dropdowns/images/image-download-version-form.options";
import { RoomTypeFormOptions } from "@/config/constants/dropdowns/images/room-type-form.options";
import { useDownloadImage } from "@/features/images/hooks/use-images";
import { ImageDownloadVersions, type ProjectImage } from "@/features/images/interfaces/images.interfaces";
import { getImagesZipUrl } from "@/features/projects/services/projects.services";
import { getDropdownOptionLabel } from "@/lib/dropdown-option-label.utils";

interface PhotoGalleryProps {
  projectId: string;
  images: ProjectImage[];
}

/** "Photos used", in video order, with per-photo downloads (original and cleaned) and a ZIP of everything. */
export const PhotoGallery: FC<PhotoGalleryProps> = ({ projectId, images }) => {
  const download = useDownloadImage();
  const ordered = [...images].sort((a, b) => a.position - b.position);
  const originalLabel = getDropdownOptionLabel(ImageDownloadVersionFormOptions, ImageDownloadVersions.ORIGINAL);
  const cleanedLabel = getDropdownOptionLabel(ImageDownloadVersionFormOptions, ImageDownloadVersions.PROCESSED);

  return (
    <section className="mt-12 md:mt-14" aria-labelledby="gallery-heading">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-eyebrow text-muted-foreground">Photos used</p>
          <h2 id="gallery-heading" className="text-display-sm mt-1">
            In video order
          </h2>
        </div>
        <Button variant="outline" render={<a href={getImagesZipUrl(projectId)} />} nativeButton={false}>
          <DownloadIcon /> Download all (ZIP)
        </Button>
      </div>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
        {ordered.map((image, index) => (
          <li key={image.id} className="overflow-hidden rounded-lg border border-hairline bg-canvas">
            <div className="relative aspect-[3/2] bg-surface-card">
              {image.thumb_url ? (
                <img
                  src={image.thumb_url}
                  alt={`Photo ${index + 1}, ${getDropdownOptionLabel(RoomTypeFormOptions, image.room_type)}`}
                  loading="lazy"
                  className="size-full object-cover"
                />
              ) : (
                <span className="grid size-full place-items-center text-muted-foreground">
                  <ImageIcon className="size-7" aria-hidden="true" />
                </span>
              )}
              <span
                className={
                  image.skipped
                    ? "absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-notice-warn px-2.5 py-0.5 text-[0.6875rem] font-medium text-ink"
                    : "absolute left-2 top-2 rounded-full bg-surface-dark/80 px-2.5 py-0.5 text-xs font-medium text-on-dark"
                }
              >
                {image.skipped ? (
                  <>
                    <AlertTriangleIcon className="size-3" aria-hidden="true" /> Skipped
                  </>
                ) : (
                  index + 1
                )}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 p-2.5">
              <Button
                variant="outline"
                size="sm"
                disabled={download.isPending}
                onClick={() => download.mutate({ id: image.id, version: ImageDownloadVersions.ORIGINAL })}
                aria-label={`Download photo ${index + 1}, ${originalLabel.toLowerCase()}`}
              >
                <DownloadIcon /> {originalLabel}
              </Button>
              {image.has_processed ? (
                <Button
                  variant="outline"
                  size="sm"
                  disabled={download.isPending}
                  onClick={() => download.mutate({ id: image.id, version: ImageDownloadVersions.PROCESSED })}
                  aria-label={`Download photo ${index + 1}, ${cleanedLabel.toLowerCase()}`}
                >
                  <DownloadIcon /> {cleanedLabel}
                </Button>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
