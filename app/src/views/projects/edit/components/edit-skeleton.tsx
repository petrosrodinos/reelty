import type { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";

/** Shaped like the edit screen: header, photo grid and the side column. */
export const EditSkeleton: FC = () => (
  <div className="page-container py-10 md:py-12" aria-busy="true">
    <Skeleton className="h-4 w-28" />
    <Skeleton className="mt-3 h-10 w-72 max-w-full" />
    <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
      <div>
        <Skeleton className="mb-4 h-12 w-56" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-60 w-full rounded-lg" />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <Skeleton className="h-96 w-full rounded-lg" />
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
    </div>
  </div>
);
