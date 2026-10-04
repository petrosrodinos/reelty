import type { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const DetailSkeleton: FC = () => (
  <div className="page-container py-10 md:py-12" aria-busy="true">
    <Skeleton className="h-4 w-32" />
    <Skeleton className="mt-3 h-10 w-80 max-w-full" />
    <Skeleton className="mt-2 h-4 w-60 max-w-full" />
    <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] lg:gap-8">
      <Skeleton className="aspect-video w-full rounded-lg" />
      <Skeleton className="h-48 w-full rounded-lg" />
    </div>
  </div>
);
