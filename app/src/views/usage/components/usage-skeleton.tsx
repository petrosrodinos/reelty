import type { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";

/** Table rows skeleton matching the usage page layout. */
export const UsageSkeleton: FC = () => (
  <div className="flex flex-col gap-3" aria-busy="true" aria-label="Loading usage">
    {Array.from({ length: 8 }).map((_, index) => (
      <Skeleton key={index} className="h-12 w-full rounded-lg" />
    ))}
  </div>
);
