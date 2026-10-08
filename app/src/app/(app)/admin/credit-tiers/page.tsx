import type { Metadata } from "next";
import AdminCreditTiersPage from "@/views/admin/credit-tiers";

export const metadata: Metadata = { title: "Credit tiers" };

export default function Page() {
  return <AdminCreditTiersPage />;
}
