import type { Metadata } from "next";
import { Suspense } from "react";
import VerifyPage from "@/views/auth/verify";
import { AuthShellSkeleton } from "@/views/auth/components/auth-shell";

export const metadata: Metadata = { title: "Verify your email" };

export default function Page() {
  return (
    <Suspense fallback={<AuthShellSkeleton />}>
      <VerifyPage />
    </Suspense>
  );
}
