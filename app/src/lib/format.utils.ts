import { format, formatDistanceToNowStrict, isToday, isYesterday, parseISO } from "date-fns";

export const VideoLimits = {
  minImages: 3,
  maxImages: 12,
  maxTitle: 60,
  maxSubtitle: 80,
  maxLocationLine: 80,
  maxClosingLine: 120,
  maxFileBytes: 20 * 1024 * 1024,
  minShortestSidePx: 640,
  recommendedLongestSidePx: 1024,
  watermarkMaxAttempts: 2,
} as const;

/** 0:50 style duration. */
export function formatDuration(totalSeconds: number | null | undefined): string {
  if (totalSeconds === null || totalSeconds === undefined || !Number.isFinite(totalSeconds)) return "–";
  const s = Math.max(0, Math.round(totalSeconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

/** Spec formula: 8 + 5N - 0.8 * (N + 1), 0 when N < 3. */
export function estimateDurationSeconds(imageCount: number): number {
  if (imageCount < VideoLimits.minImages) return 0;
  return 8 + 5 * imageCount - 0.8 * (imageCount + 1);
}

export function pluralize(count: number, singular: string, plural = `${singular}s`): string {
  return `${count} ${count === 1 ? singular : plural}`;
}

export function formatBytes(bytes: number | null | undefined): string {
  if (!bytes) return "";
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** "Today", "Yesterday" or "4 Oct 2026". */
export function formatProjectDate(iso: string | null | undefined): string {
  if (!iso) return "";
  const date = parseISO(iso);
  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  return format(date, "d MMM yyyy");
}

export function formatDateLong(iso: string | null | undefined): string {
  if (!iso) return "";
  return format(parseISO(iso), "d MMMM yyyy");
}

export function formatRelative(iso: string | null | undefined): string {
  if (!iso) return "";
  return `${formatDistanceToNowStrict(parseISO(iso))} ago`;
}

/** "$0.1000" for small amounts, "$12.50" from a dollar up. */
export function formatUsd(amount: number | null | undefined): string {
  if (amount === null || amount === undefined || !Number.isFinite(amount)) return "–";
  return `$${amount.toFixed(Math.abs(amount) < 1 ? 4 : 2)}`;
}

/** "7.5", "1", "22.25": up to 2 decimals, no trailing zeros. */
export function formatCredits(credits: number | null | undefined): string {
  if (credits === null || credits === undefined || !Number.isFinite(credits)) return "–";
  return String(Number(credits.toFixed(2)));
}

/** "€12.50" from integer euro cents. */
export function formatEurCents(cents: number | null | undefined): string {
  if (cents === null || cents === undefined || !Number.isFinite(cents)) return "–";
  return `€${(cents / 100).toFixed(2)}`;
}

/** "$12.50" from integer dollar cents. */
export function formatUsdCents(cents: number | null | undefined): string {
  if (cents === null || cents === undefined || !Number.isFinite(cents)) return "–";
  return `$${(cents / 100).toFixed(2)}`;
}

/** "3.2%". */
export function formatPercent(value: number | null | undefined): string {
  if (value === null || value === undefined || !Number.isFinite(value)) return "–";
  return `${Number(value.toFixed(2))}%`;
}

export function getInitial(email: string | null | undefined): string {
  return (email?.trim()[0] ?? "?").toUpperCase();
}
