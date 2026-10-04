"use client";

import { useSyncExternalStore, type FC } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Routes } from "@/routes/routes";

const STORAGE_KEY = "reelty.cookie-notice";
const CHANGE_EVENT = "reelty:cookie-notice";

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function readDismissed(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function dismiss() {
  try {
    window.localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // storage unavailable: the notice simply reappears next visit
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** Small dark card (DESIGN.MD cookie-consent-card). Reelty only sets essential session cookies. */
export const CookieNotice: FC = () => {
  const dismissed = useSyncExternalStore(subscribe, readDismissed, () => true);
  if (dismissed) return null;
  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="dark fixed bottom-4 left-4 right-4 z-50 rounded-lg bg-surface-dark p-5 text-sm text-on-dark sm:left-auto sm:right-6 sm:bottom-6 sm:w-[360px]"
    >
      <p className="text-base font-medium">We use cookies</p>
      <p className="mt-1.5 text-on-dark-soft">
        Essential cookies keep you signed in and protect your session. No ad tracking.{" "}
        <Link href={Routes.privacy} className="underline underline-offset-2">
          Privacy Policy
        </Link>
      </p>
      <div className="mt-4">
        <Button size="sm" onClick={dismiss}>
          Got it
        </Button>
      </div>
    </div>
  );
};
