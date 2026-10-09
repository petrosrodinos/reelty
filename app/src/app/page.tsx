import type { Metadata } from "next";
import LandingPage from "@/views/landing";

// Page-level openGraph would replace the root one wholesale, so only the canonical is set here.
export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Page() {
  return <LandingPage />;
}
