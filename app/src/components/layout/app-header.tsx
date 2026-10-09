"use client";

import { useState, type FC } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CoinsIcon, LogOutIcon, MailIcon, MenuIcon, PlusIcon, ShieldCheckIcon } from "lucide-react";
import { BrandLogo } from "@/components/layout/brand-logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useLogout, useResendVerification } from "@/features/auth/hooks/use-auth";
import { isAdminRole, type Me } from "@/features/auth/interfaces/auth.interfaces";
import { getInitial, pluralize } from "@/lib/format.utils";
import { cn } from "@/lib/utils";
import { Routes } from "@/routes/routes";

const navLinks = [
  { label: "My Videos", href: Routes.videos },
  { label: "New video", href: Routes.new },
  { label: "Usage", href: Routes.usage },
];

interface AppHeaderProps {
  me: Me;
}

export const AppHeader: FC<AppHeaderProps> = ({ me }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [sheetOpen, setSheetOpen] = useState(false);
  const logout = useLogout();
  const resend = useResendVerification();

  const outOfCredits = me.credits.balance <= 0;
  const creditsLabel = pluralize(me.credits.balance, "credit");

  const handleLogout = () => {
    setSheetOpen(false);
    logout.mutate(undefined, { onSettled: () => router.replace(Routes.home) });
  };

  const links = isAdminRole(me.role) ? [...navLinks, { label: "Admin", href: Routes.adminAnalytics }] : navLinks;

  const isActive = (href: string) =>
    pathname === href ||
    (href === Routes.videos && pathname.startsWith("/projects")) ||
    (href === Routes.adminAnalytics && pathname.startsWith("/admin"));

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-hairline-soft bg-canvas">
      <div className="page-container flex h-16 items-center gap-4 md:gap-8">
        <BrandLogo href={Routes.videos} />
        <nav aria-label="Primary" className="hidden flex-1 items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "rounded-md px-3.5 py-2 text-sm font-medium text-ink outline-none transition-colors hover:bg-surface-card focus-visible:ring-3 focus-visible:ring-ring/50",
                isActive(link.href) && "bg-surface-card",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:gap-3">
          <Link
            href={Routes.credits}
            title="Buy credits"
            className={cn(
              "hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.8125rem] font-medium outline-none transition-colors hover:text-ink focus-visible:ring-3 focus-visible:ring-ring/50 sm:inline-flex",
              outOfCredits ? "bg-notice-warn text-ink" : "bg-surface-card text-muted-foreground",
            )}
          >
            <CoinsIcon className="size-3.5" aria-hidden="true" />
            {creditsLabel}
            <span className="text-ink">· Buy</span>
          </Link>
          <Button className="hidden md:inline-flex" render={<Link href={Routes.new} />} nativeButton={false}>
            <PlusIcon /> New video
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label="Account menu"
              className="grid size-10 place-items-center rounded-full border border-hairline bg-surface-strong text-sm font-medium text-ink outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {getInitial(me.email)}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="flex flex-col gap-0.5 px-2 py-2">
                  <span className="break-all text-sm font-medium text-ink">{me.email}</span>
                  <span className="flex items-center gap-1.5 text-[0.8125rem] font-normal text-muted-foreground">
                    <ShieldCheckIcon className="size-3.5" aria-hidden="true" />
                    {me.email_verified ? "Email verified" : "Email not verified"}
                  </span>
                  <span className="text-[0.8125rem] font-normal text-muted-foreground sm:hidden">{creditsLabel}</span>
                </DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push(Routes.credits)} className="py-2">
                <CoinsIcon /> Buy credits
              </DropdownMenuItem>
              {!me.email_verified ? (
                <DropdownMenuItem onClick={() => resend.mutate()} className="py-2">
                  <MailIcon /> Resend verification
                </DropdownMenuItem>
              ) : null}
              <DropdownMenuItem onClick={handleLogout} className="py-2">
                <LogOutIcon /> Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu" />}>
              <MenuIcon />
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-none gap-0 bg-canvas sm:max-w-none">
              <SheetHeader className="h-16 justify-center border-b border-hairline-soft px-4">
                <SheetTitle className="font-display text-2xl">Menu</SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="flex flex-col gap-1 p-4">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setSheetOpen(false)}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(
                      "rounded-md px-3 py-3 text-lg font-medium text-ink hover:bg-surface-card",
                      isActive(link.href) && "bg-surface-card",
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href={Routes.credits}
                  onClick={() => setSheetOpen(false)}
                  className="mt-3 px-3 text-sm text-muted-foreground underline-offset-4 hover:underline"
                >
                  {creditsLabel} · Buy credits
                </Link>
                <Button className="mt-3 h-12" onClick={handleLogout} variant="outline">
                  <LogOutIcon /> Log out
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
