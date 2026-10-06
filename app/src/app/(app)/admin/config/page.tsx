import type { Metadata } from "next";
import AdminConfigPage from "@/views/admin/config";

export const metadata: Metadata = { title: "Prices" };

export default function Page() {
  return <AdminConfigPage />;
}
