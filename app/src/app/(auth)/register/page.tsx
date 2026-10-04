import type { Metadata } from "next";
import RegisterPage from "@/views/auth/register";

export const metadata: Metadata = { title: "Create your account" };

export default function Page() {
  return <RegisterPage />;
}
