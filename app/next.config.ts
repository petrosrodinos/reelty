import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

// Origins the browser may talk to: our API (set at build time) and Google Cloud Storage for signed uploads/downloads.
const apiOrigin = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000").origin;
  } catch {
    return "";
  }
})();

// PostHog is proxied through /ingest (same origin, so ad blockers and the CSP leave it alone).
const posthogHost = (process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com").replace(/\/+$/, "");
const posthogAssetsHost = posthogHost.replace(".i.posthog.com", "-assets.i.posthog.com");

const contentSecurityPolicy = [
  "default-src 'self'",
  // Next.js injects inline bootstrap scripts and styles; tighten with nonces once a proxy is in front.
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://storage.googleapis.com https://*.googleusercontent.com https://*.google-analytics.com https://*.googletagmanager.com",
  "media-src 'self' blob: https://storage.googleapis.com",
  "font-src 'self' data:",
  `connect-src 'self' ${apiOrigin} https://storage.googleapis.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), interest-cohort=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  ...(isProd
    ? [
        { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        // Skipped in development: React dev tooling needs eval.
        { key: "Content-Security-Policy", value: contentSecurityPolicy },
      ]
    : []),
];

const nextConfig: NextConfig = {
  // Standalone output is for the Docker image; Vercel does its own packaging and fails on it (missing next-server.js.nft.json).
  ...(process.env.VERCEL ? {} : { output: "standalone" as const }),
  poweredByHeader: false,
  reactStrictMode: true,
  // PostHog's API paths carry trailing slashes that must not be redirected.
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      { source: "/ingest/static/:path*", destination: `${posthogAssetsHost}/static/:path*` },
      { source: "/ingest/array/:path*", destination: `${posthogAssetsHost}/array/:path*` },
      { source: "/ingest/:path*", destination: `${posthogHost}/:path*` },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
