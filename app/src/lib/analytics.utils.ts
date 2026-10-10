import { readConsent } from "@/lib/consent.utils";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Sends a GA4 event. A no-op unless analytics is configured and the visitor accepted cookies. */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  if (readConsent() !== "granted") return;
  window.gtag("event", name, params);
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
