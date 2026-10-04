import type { Metadata } from "next";
import { AuthGuard } from "@/components/layout/auth-guard";

// Authenticated screens are never indexed.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function AppLayout({ children }: LayoutProps<"/">) {
  return <AuthGuard>{children}</AuthGuard>;
}
