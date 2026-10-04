import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";
import { Routes } from "@/routes/routes";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="page-container flex flex-1 flex-col items-center justify-center gap-4 py-24 text-center">
        <p className="text-eyebrow text-muted-foreground">404</p>
        <h1 className="text-display-lg">Page not found</h1>
        <p className="max-w-md text-muted-foreground">That page does not exist, or it moved.</p>
        <Button size="lg" render={<Link href={Routes.home} />} nativeButton={false}>
          Go home
        </Button>
      </main>
      <SiteFooter />
    </>
  );
}
