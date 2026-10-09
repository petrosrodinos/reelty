import type { FC, ReactNode } from "react";
import Link from "next/link";
import { AppHeader } from "@/components/layout/app-header";
import { PoweredBy } from "@/components/layout/powered-by";
import { OfflineBanner, VerificationBanner } from "@/components/layout/app-banners";
import type { Me } from "@/features/auth/interfaces/auth.interfaces";
import { Routes } from "@/routes/routes";

interface AppShellProps {
  me: Me;
  children: ReactNode;
}

/** Authenticated frame: top nav, offline + verification banners, content, slim legal footer. */
export const AppShell: FC<AppShellProps> = ({ me, children }) => (
  <>
    <AppHeader me={me} />
    <OfflineBanner />
    {!me.email_verified ? <VerificationBanner /> : null}
    <main id="main" className="flex-1">
      {children}
    </main>
    <footer className="border-t border-hairline-soft bg-canvas">
      <div className="page-container flex flex-col gap-3 py-6 text-[0.8125rem] text-muted-foreground sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <span className="sm:max-w-md">Videos are AI-generated from your photos and may differ from the real property.</span>
        <span className="flex flex-wrap gap-x-4 gap-y-1 sm:justify-end">
          <Link href={Routes.terms} className="hover:text-ink">
            Terms
          </Link>
          <Link href={Routes.privacy} className="hover:text-ink">
            Privacy
          </Link>
          <Link href={Routes.contact} className="hover:text-ink">
            Contact
          </Link>
          <PoweredBy className="hover:text-ink" />
        </span>
      </div>
    </footer>
  </>
);
