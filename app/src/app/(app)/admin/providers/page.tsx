import type { Metadata } from "next";
import AdminProvidersPage from "@/views/admin/providers";

export const metadata: Metadata = { title: "Providers" };

export default function Page() {
  return <AdminProvidersPage />;
}
