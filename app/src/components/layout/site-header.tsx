"use client";

import { useState, type FC } from "react";
import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { BrandLogo } from "@/components/layout/brand-logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useMe } from "@/features/auth/hooks/use-auth";
import { Routes } from "@/routes/routes";

const navLinks = [
  { label: "How it works", href: Routes.homeSection("how") },
  { label: "Pricing", href: Routes.homeSection("pricing") },
  { label: "FAQ", href: Routes.homeSection("faq") },
];

/** Public top nav (landing, auth, legal). Hamburger sheet below 768 px. */
export const SiteHeader: FC = () => {
  const [open, setOpen] = useState(false);
  const { data: me } = useMe({ requireSessionHint: true });

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-hairline-soft bg-canvas">
      <div className="page-container flex h-16 items-center gap-6">
        <BrandLogo />
        <nav aria-label="Primary" className="hidden flex-1 items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3.5 py-2 text-sm font-medium text-ink outline-none transition-colors hover:bg-surface-card focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 md:ml-0">
          {me ? (
            <Button render={<Link href={Routes.videos} />} nativeButton={false}>
              My Videos
            </Button>
          ) : (
            <>
              <Button variant="ghost" className="hidden sm:inline-flex" render={<Link href={Routes.login} />} nativeButton={false}>
                Sign in
              </Button>
              <Button render={<Link href={Routes.register} />} nativeButton={false}>
                Try Reelty
              </Button>
            </>
          )}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu" />}>
              <MenuIcon />
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-none gap-0 bg-canvas sm:max-w-none">
              <SheetHeader className="h-16 justify-center border-b border-hairline-soft px-4">
                <SheetTitle className="font-display text-2xl">Menu</SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="flex flex-col gap-1 p-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-3 text-lg font-medium text-ink hover:bg-surface-card"
                  >
                    {link.label}
                  </Link>
                ))}
                {!me ? (
                  <Link
                    href={Routes.login}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-3 text-lg font-medium text-ink hover:bg-surface-card"
                  >
                    Sign in
                  </Link>
                ) : null}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
