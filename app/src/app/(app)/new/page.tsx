import type { Metadata } from "next";
import { Suspense } from "react";
import NewVideoPage from "@/views/new";

export const metadata: Metadata = { title: "New video" };

export default function Page() {
  return (
    <Suspense>
      <NewVideoPage />
    </Suspense>
  );
}
