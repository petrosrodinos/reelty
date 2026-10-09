import type { Metadata } from "next";

// Auth screens have no search value; keep them out of the index (links stay followable).
export const metadata: Metadata = { robots: { index: false, follow: true } };

export default function AuthLayout({ children }: LayoutProps<"/">) {
  return children;
}
