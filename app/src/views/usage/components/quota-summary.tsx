import type { FC } from "react";
import type { Usage } from "@/features/usage/interfaces/usage.interfaces";
import { formatDateLong, pluralize } from "@/lib/format.utils";

interface QuotaSummaryProps {
  usage: Usage;
}

export const QuotaSummary: FC<QuotaSummaryProps> = ({ usage }) => {
  const percent = usage.limit > 0 ? Math.min(100, Math.round((usage.used / usage.limit) * 100)) : 0;

  return (
    <div className="mb-8 rounded-lg border p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-sm text-muted-foreground">This month</p>
        <p className="text-sm text-muted-foreground">Resets {formatDateLong(usage.resets_at)}</p>
      </div>
      <p className="mt-1 text-2xl font-semibold tabular-nums">
        {usage.used} of {usage.limit} {pluralize(usage.limit, "video")} used
      </p>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={usage.limit}
        aria-valuenow={usage.used}
        aria-label="Monthly video quota used"
        className="mt-3 h-2 overflow-hidden rounded-full bg-muted"
      >
        <div className="h-full rounded-full bg-primary" style={{ width: `${percent}%` }} />
      </div>
      <p className="mt-3 text-sm text-muted-foreground tabular-nums">
        {usage.remaining} {pluralize(usage.remaining, "video")} remaining
      </p>
    </div>
  );
};
