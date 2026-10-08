import type { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";

/** Table rows skeleton matching the usage page layout. */
export const UsageSkeleton: FC<{ rows?: number }> = ({ rows = 8 }) => (
  <div className="flex flex-col gap-3" aria-busy="true" aria-label="Loading usage">
    {Array.from({ length: rows }).map((_, index) => (
      <Skeleton key={index} className="h-12 w-full rounded-lg" />
    ))}
  </div>
);
