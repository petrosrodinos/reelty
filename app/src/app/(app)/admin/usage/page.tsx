import type { Metadata } from "next";
import AdminUsagePage from "@/views/admin/usage";

export const metadata: Metadata = { title: "Cost ledger" };

export default function Page() {
  return <AdminUsagePage />;
}
