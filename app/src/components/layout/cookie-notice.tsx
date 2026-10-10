"use client";

import type { FC } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { setConsent, useAnalyticsConsent, useCookiePreferencesOpen } from "@/lib/consent.utils";
import { Routes } from "@/routes/routes";

/** Small dark card (DESIGN.MD cookie-consent-card). Essential cookies always apply; analytics needs an explicit yes. */
export const CookieNotice: FC = () => {
  const consent = useAnalyticsConsent();
  const preferencesOpen = useCookiePreferencesOpen();
  if (consent !== null && !preferencesOpen) return null;
  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="dark fixed bottom-4 left-4 right-4 z-50 rounded-lg bg-surface-dark p-5 text-sm text-on-dark sm:left-auto sm:right-6 sm:bottom-6 sm:w-[380px]"
    >
      <p className="text-base font-medium">We use cookies</p>
      <p className="mt-1.5 text-on-dark-soft">
        Essential cookies keep you signed in and protect your session. With your OK, analytics cookies also help us see
        which parts of Reelty are used. No ad tracking.{" "}
        <Link href={Routes.privacy} className="underline underline-offset-2">
          Privacy Policy
        </Link>
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button size="sm" onClick={() => setConsent("granted")}>
          Accept all
        </Button>
        <Button size="sm" variant="outline" onClick={() => setConsent("denied")}>
          Essential only
        </Button>
      </div>
    </div>
  );
};
