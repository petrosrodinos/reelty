import type { FC } from "react";
import { Loader2Icon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { UploadItemStatuses, type UploadItem } from "@/features/images/interfaces/images.interfaces";

interface ImageCardSkeletonProps {
  item: UploadItem;
}

/** Placeholder card for a photo that is still uploading, same footprint as ImageCard so the grid does not jump. */
export const ImageCardSkeleton: FC<ImageCardSkeletonProps> = ({ item }) => {
  const uploading = item.status === UploadItemStatuses.UPLOADING;
  const label = uploading ? `Uploading ${item.progress}%` : item.status === UploadItemStatuses.QUEUED ? "Waiting" : "Checking photo";
  return (
    <li
      className="relative flex list-none flex-col overflow-hidden rounded-lg border border-hairline bg-canvas"
      aria-busy="true"
      aria-label={`${item.name}: ${label}`}
    >
      <div className="relative grid aspect-[3/2] place-items-center rounded-none bg-surface-card">
        <Skeleton className="absolute inset-0 rounded-none" />
        <span className="relative flex flex-col items-center gap-1.5 text-sm text-muted-foreground">
          <Loader2Icon className="size-5 animate-spin text-brand" aria-hidden="true" />
          {label}
        </span>
        {uploading ? (
          <div
            className="absolute inset-x-0 bottom-0 h-1 bg-surface-card"
            role="progressbar"
            aria-label={`Uploading ${item.name}`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={item.progress}
          >
            <div className="h-full bg-brand transition-[width] duration-200" style={{ width: `${item.progress}%` }} />
          </div>
        ) : null}
      </div>
      <div className="flex flex-col gap-2 p-3">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-9 w-full" />
      </div>
    </li>
  );
};
