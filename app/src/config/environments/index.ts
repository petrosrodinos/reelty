// Typed environment access. Never read process.env directly elsewhere.
export const environments = {
  apiUrl: (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000").replace(/\/+$/, ""),
} as const;
