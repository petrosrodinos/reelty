import type { Metadata } from "next";
import VideosPage from "@/views/videos";

export const metadata: Metadata = { title: "My Videos" };

export default function Page() {
  return <VideosPage />;
}
