import type { AnalyticsRange } from "@/features/admin/interfaces/analytics.interfaces";

export const AnalyticsRangeFormOptions: { id: AnalyticsRange; label: string }[] = [
  { id: "7d", label: "Last 7 days" },
  { id: "30d", label: "Last 30 days" },
  { id: "90d", label: "Last 90 days" },
  { id: "12m", label: "Last 12 months" },
  { id: "all", label: "All time" },
];
