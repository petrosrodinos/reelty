import type { Metadata } from "next";
import ContactPage from "@/views/contact";

export const metadata: Metadata = { title: "Contact us" };

export default function Page() {
  return <ContactPage />;
}
