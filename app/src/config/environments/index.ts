// Typed environment access. Never read process.env directly elsewhere.
export const environments = {
  /** Public origin of this site (canonical URLs, sitemap, OG). Set NEXT_PUBLIC_APP_URL in production. */
  appUrl: (process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3001").replace(/\/+$/, ""),
  apiUrl: (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000").replace(/\/+$/, ""),
  /** GA4 measurement id (G-XXXXXXX). Leave unset to disable analytics entirely. */
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "",
} as const;
