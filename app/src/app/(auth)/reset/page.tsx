import type { Metadata } from "next";
import { Suspense } from "react";
import ResetPasswordPage from "@/views/auth/reset";
import { AuthShellSkeleton } from "@/views/auth/components/auth-shell";

export const metadata: Metadata = { title: "Choose a new password" };

export default function Page() {
  return (
    <Suspense fallback={<AuthShellSkeleton />}>
      <ResetPasswordPage />
    </Suspense>
  );
}
