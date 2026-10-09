import { format, parseISO } from "date-fns";
import type { AnalyticsBucket } from "@/features/admin/interfaces/analytics.interfaces";

/** Categorical slots in fixed order (validated light/dark pairs). Assigned per chart, never cycled. */
export const SeriesColors = [
  { light: "#2a78d6", dark: "#3987e5" },
  { light: "#eb6834", dark: "#d95926" },
  { light: "#1baf7a", dark: "#199e70" },
  { light: "#eda100", dark: "#c98500" },
] as const;

/** Short period label for axis ticks. */
export function formatPeriodTick(period: string, bucket: AnalyticsBucket): string {
  const date = parseISO(period);
  return bucket === "month" ? format(date, "MMM yy") : format(date, "d MMM");
}

/** Full period label for tooltips and the table. */
export function formatPeriodLong(period: string, bucket: AnalyticsBucket): string {
  const date = parseISO(period);
  if (bucket === "month") return format(date, "MMMM yyyy");
  if (bucket === "week") return `Week of ${format(date, "d MMM yyyy")}`;
  return format(date, "EEE d MMM yyyy");
}

/** Euros from cents, for chart values. */
export const toEur = (cents: number | null): number | null => (cents === null ? null : Math.round(cents) / 100);

const eurFormatter = new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" });
const eurCompactFormatter = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  notation: "compact",
  maximumFractionDigits: 1,
});

export const formatEur = (eur: number | null | undefined): string =>
  eur === null || eur === undefined || !Number.isFinite(eur) ? "–" : eurFormatter.format(eur);

export const formatEurCompact = (eur: number): string => eurCompactFormatter.format(eur);

export const formatCount = (value: number | null | undefined, digits = 0): string =>
  value === null || value === undefined || !Number.isFinite(value)
    ? "–"
    : value.toLocaleString("en-IE", { maximumFractionDigits: digits });
