import type { Metadata } from "next";
import AdminAnalyticsPage from "@/views/admin/analytics";

export const metadata: Metadata = { title: "Analytics" };

export default function Page() {
  return <AdminAnalyticsPage />;
}
