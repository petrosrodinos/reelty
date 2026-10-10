// Typed environment access. Never read process.env directly elsewhere.
export const environments = {
  /** Public origin of this site (canonical URLs, sitemap, OG). Set NEXT_PUBLIC_APP_URL in production. */
  appUrl: (process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3001").replace(/\/+$/, ""),
  apiUrl: (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000").replace(/\/+$/, ""),
  /** GA4 measurement id (G-XXXXXXX). Leave unset to disable analytics entirely. */
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "",
  /** PostHog project API key (phc_...) for custom events. Leave unset to disable. */
  posthogKey: process.env.NEXT_PUBLIC_POSTHOG_KEY ?? "",
  /** PostHog region host (https://eu.i.posthog.com or https://us.i.posthog.com). Browser traffic goes through the /ingest proxy. */
  posthogHost: (process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com").replace(/\/+$/, ""),
} as const;
