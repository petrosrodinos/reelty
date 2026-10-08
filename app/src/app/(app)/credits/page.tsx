import type { Metadata } from "next";
import { Suspense } from "react";
import CreditsPage from "@/views/credits";

export const metadata: Metadata = { title: "Credits" };

export default function Page() {
  return (
    <Suspense>
      <CreditsPage />
    </Suspense>
  );
}
