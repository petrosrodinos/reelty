import type { FC } from "react";
import type { PurchasesSummary } from "@/features/billing/interfaces/billing.interfaces";
import { formatEurCents, formatPercent, formatUsdCents } from "@/lib/format.utils";

interface PurchasesSummaryCardsProps {
  summary: PurchasesSummary;
}

/** Gross, Stripe fees and net over settled purchases in the filtered set, in EUR with USD below. */
export const PurchasesSummaryCards: FC<PurchasesSummaryCardsProps> = ({ summary }) => {
  const cards = [
    {
      label: "Gross",
      eur: summary.amount_eur_cents,
      usd: summary.amount_usd_cents,
      note: `${summary.purchases} ${summary.purchases === 1 ? "purchase" : "purchases"} · ${summary.credits} credits`,
    },
    {
      label: "Stripe fees",
      eur: summary.stripe_fee_eur_cents,
      usd: summary.stripe_fee_usd_cents,
      note: `${formatPercent(summary.avg_fee_pct)} of gross`,
    },
    { label: "Net", eur: summary.net_eur_cents, usd: summary.net_usd_cents, note: "Gross minus Stripe fees" },
    {
      label: "Refunded",
      eur: summary.refunded_eur_cents,
      usd: null,
      note: `${summary.refunded_credits} credits taken back`,
    },
  ];

  return (
    <section aria-label="Totals" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <div
          key={card.label}
          className={index === 0 ? "rounded-lg border border-hairline bg-surface-card p-5" : "rounded-lg border border-hairline p-5"}
        >
          <p className="text-eyebrow text-muted-foreground">{card.label}</p>
          <p className="text-display-sm mt-2 tabular-nums">{formatEurCents(card.eur)}</p>
          <p className="mt-3 text-sm text-muted-foreground">
            {card.usd !== null ? (
              <>
                {formatUsdCents(card.usd)}
                <br />
              </>
            ) : null}
            {card.note}
          </p>
        </div>
      ))}
    </section>
  );
};
