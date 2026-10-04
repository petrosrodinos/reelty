import type { Metadata } from "next";
import { Suspense } from "react";
import LoginPage from "@/views/auth/login";
import { AuthShellSkeleton } from "@/views/auth/components/auth-shell";

export const metadata: Metadata = { title: "Log in" };

export default function Page() {
  return (
    <Suspense fallback={<AuthShellSkeleton />}>
      <LoginPage />
    </Suspense>
  );
}
