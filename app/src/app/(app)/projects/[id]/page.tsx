import type { Metadata } from "next";
import { Suspense } from "react";
import ProjectDetailPage from "@/views/projects/detail";
import { DetailSkeleton } from "@/views/projects/detail/components/detail-skeleton";

export const metadata: Metadata = { title: "Your video" };

export default async function Page(props: PageProps<"/projects/[id]">) {
  const { id } = await props.params;
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <ProjectDetailPage id={id} />
    </Suspense>
  );
}
