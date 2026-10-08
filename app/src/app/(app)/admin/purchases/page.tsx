import type { Metadata } from "next";
import AdminPurchasesPage from "@/views/admin/purchases";

export const metadata: Metadata = { title: "Purchases" };

export default function Page() {
  return <AdminPurchasesPage />;
}
