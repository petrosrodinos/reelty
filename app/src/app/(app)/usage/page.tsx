import type { Metadata } from "next";
import UsagePage from "@/views/usage";

export const metadata: Metadata = { title: "Usage" };

export default function Page() {
  return <UsagePage />;
}
