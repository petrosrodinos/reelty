import posthog from "posthog-js";
import { readConsent } from "@/lib/consent.utils";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Sends a custom event to PostHog and Google Analytics. Each destination is skipped when it is not configured or not
 * loaded yet; nothing is sent unless the visitor accepted cookies.
 */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || readConsent() !== "granted") return;
  if (posthog.__loaded) posthog.capture(name, params);
  if (typeof window.gtag === "function") window.gtag("event", name, params);
}

/** Removes GA cookies (_ga, _ga_<ID>) from this host and its parent domains after consent is withdrawn. */
export function clearAnalyticsCookies() {
  if (typeof document === "undefined") return;
  const names = document.cookie
    .split("; ")
    .map((row) => row.split("=")[0])
    .filter((name) => name === "_ga" || name.startsWith("_ga_") || name === "_gid");
  const parts = window.location.hostname.split(".");
  const parents = parts.map((_, i) => parts.slice(i).join(".")).filter((d) => d.includes("."));
  for (const name of names) {
    document.cookie = `${name}=; Max-Age=0; path=/`;
    for (const domain of parents) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${domain}`;
    }
  }
}

/** Custom event names sent to PostHog and GA4 (recommended GA4 names are used where one exists). */
export const AnalyticsEvents = {
  SIGN_UP: "sign_up",
  LOGIN: "login",
  LOGOUT: "logout",
  EMAIL_VERIFIED: "email_verified",
  CTA_CLICK: "cta_click",
  PROJECT_CREATED: "project_created",
  PHOTOS_UPLOADED: "photos_uploaded",
  WATERMARK_REMOVAL_STARTED: "watermark_removal_started",
  VIDEO_SUBMITTED: "video_submitted",
  VIDEO_RETRIED: "video_retried",
  VIDEO_DOWNLOADED: "video_downloaded",
  PROJECT_DELETED: "project_deleted",
  BEGIN_CHECKOUT: "begin_checkout",
  CHECKOUT_CANCELLED: "checkout_cancelled",
  CONTACT_SENT: "contact_message_sent",
} as const;
