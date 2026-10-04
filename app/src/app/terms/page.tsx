import type { Metadata } from "next";
import TermsPage from "@/views/legal/terms";

export const metadata: Metadata = { title: "Terms of Service" };

export default function Page() {
  return <TermsPage />;
}
