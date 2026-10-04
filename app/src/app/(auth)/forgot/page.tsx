import type { Metadata } from "next";
import ForgotPasswordPage from "@/views/auth/forgot";

export const metadata: Metadata = { title: "Reset your password" };

export default function Page() {
  return <ForgotPasswordPage />;
}
