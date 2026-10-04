// Centralized frontend paths. Every <Link href>, router.push() and redirect() target comes from here.
export const Routes = {
  home: "/",
  login: "/login",
  register: "/register",
  forgot: "/forgot",
  reset: "/reset",
  verify: "/verify",
  terms: "/terms",
  privacy: "/privacy",
  new: "/new",
  videos: "/videos",
  project: (id: string) => `/projects/${id}`,
  projectCreated: (id: string) => `/projects/${id}?created=1`,
  edit: (id: string) => `/projects/${id}/edit`,
  newWithTab: (tab: string) => `/new?tab=${tab}`,
  homeSection: (section: string) => `/#${section}`,
  loginWithNext: (next: string, expired = false) =>
    `/login?next=${encodeURIComponent(next)}${expired ? "&expired=1" : ""}`,
} as const;

export const QueryParams = {
  next: "next",
  token: "token",
  tab: "tab",
  expired: "expired",
  created: "created",
} as const;

/** Only allow same-origin relative redirect targets (blocks open redirects). */
export function getSafeNextPath(next: string | null | undefined, fallback: string): string {
  if (!next) return fallback;
  if (!next.startsWith("/") || next.startsWith("//") || next.includes("\\")) return fallback;
  return next;
}
