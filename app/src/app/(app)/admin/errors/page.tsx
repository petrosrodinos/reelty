import type { Metadata } from "next";
import AdminErrorsPage from "@/views/admin/errors";

export const metadata: Metadata = { title: "Errors" };

export default function Page() {
  return <AdminErrorsPage />;
}
