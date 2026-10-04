import type { Metadata } from "next";
import PrivacyPage from "@/views/legal/privacy";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function Page() {
  return <PrivacyPage />;
}
