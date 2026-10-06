import type { FC } from "react";
import { CostLedgerKindFormOptions } from "@/config/constants/dropdowns/admin/cost-ledger-kind-form.options";
import { CostLedgerKinds, type CostSummary } from "@/features/admin/interfaces/admin.interfaces";
import { getDropdownOptionLabel } from "@/lib/dropdown-option-label.utils";
import { formatCredits, formatUsd } from "@/lib/format.utils";

interface CostSummaryProps {
  summary: CostSummary;
}

const QUOTA_KINDS: ReadonlyArray<string> = [CostLedgerKinds.VIDEO, CostLedgerKinds.VIDEO_REFUND];

/** Total spend plus one card per provider-billed kind. Quota-only kinds carry no cost and are left out. */
export const CostSummaryCards: FC<CostSummaryProps> = ({ summary }) => {
  const providerKinds = summary.breakdown.filter((item) => !QUOTA_KINDS.includes(item.kind));
  const reported = summary.total_cost_usd - summary.estimated_cost_usd;

  return (
    <section aria-label="Totals" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-lg border border-hairline bg-surface-card p-5">
        <p className="text-eyebrow text-muted-foreground">Total cost</p>
        <p className="text-display-sm mt-2 tabular-nums">{formatUsd(summary.total_cost_usd)}</p>
        <p className="mt-3 text-sm text-muted-foreground">
          {formatUsd(reported)} reported by providers
          <br />
          {formatUsd(summary.estimated_cost_usd)} estimated from prices
        </p>
      </div>
      {providerKinds.map((item) => (
        <div key={item.kind} className="rounded-lg border border-hairline p-5">
          <p className="text-eyebrow text-muted-foreground">
            {getDropdownOptionLabel(CostLedgerKindFormOptions, item.kind)}
          </p>
          <p className="text-display-sm mt-2 tabular-nums">{formatUsd(item.cost_usd)}</p>
          <p className="mt-3 text-sm text-muted-foreground">
            {item.entries} {item.entries === 1 ? "entry" : "entries"}
            {item.credits > 0 ? ` · ${formatCredits(item.credits)} credits` : ""}
          </p>
        </div>
      ))}
    </section>
  );
};
