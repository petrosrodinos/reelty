import type { FC } from "react";
import { format, parseISO } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PurchaseStatusFormOptions } from "@/config/constants/dropdowns/billing/purchase-status-form.options";
import { PurchaseStatuses, type AdminPurchase } from "@/features/billing/interfaces/billing.interfaces";
import { getDropdownOptionLabel } from "@/lib/dropdown-option-label.utils";
import { formatEurCents, formatPercent, formatProjectDate, formatUsdCents } from "@/lib/format.utils";

interface AdminPurchasesTableProps {
  purchases: AdminPurchase[];
}

/** One money cell: EUR on top, USD below. */
const Money: FC<{ eur: number | null; usd: number | null }> = ({ eur, usd }) => (
  <>
    <span className="block">{formatEurCents(eur)}</span>
    <span className="block text-xs text-muted-foreground">{formatUsdCents(usd)}</span>
  </>
);

export const AdminPurchasesTable: FC<AdminPurchasesTableProps> = ({ purchases }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Date</TableHead>
        <TableHead>User</TableHead>
        <TableHead className="text-right">Credits</TableHead>
        <TableHead className="text-right">Amount</TableHead>
        <TableHead className="text-right">Stripe fee</TableHead>
        <TableHead className="text-right">Fee %</TableHead>
        <TableHead className="text-right">Net</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Payment</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {purchases.map((p) => {
        const at = p.paid_at ?? p.created_at;
        return (
          <TableRow key={p.id}>
            <TableCell className="whitespace-nowrap">
              <span className="block">{formatProjectDate(at)}</span>
              <span className="block text-xs text-muted-foreground">{format(parseISO(at), "HH:mm")}</span>
            </TableCell>
            <TableCell className="max-w-56 truncate">{p.user_email}</TableCell>
            <TableCell className="text-right tabular-nums">
              {p.credits}
              {p.refunded_credits > 0 ? (
                <span className="block text-xs text-muted-foreground">−{p.refunded_credits} refunded</span>
              ) : null}
              <span className="block text-xs text-muted-foreground">{p.credits_per_eur}/€</span>
            </TableCell>
            <TableCell className="text-right whitespace-nowrap tabular-nums">
              <Money eur={p.amount_eur_cents} usd={p.amount_usd_cents} />
            </TableCell>
            <TableCell className="text-right whitespace-nowrap tabular-nums">
              <Money eur={p.stripe_fee_eur_cents} usd={p.stripe_fee_usd_cents} />
            </TableCell>
            <TableCell className="text-right tabular-nums">{formatPercent(p.stripe_fee_pct)}</TableCell>
            <TableCell className="text-right whitespace-nowrap tabular-nums">
              <Money eur={p.net_eur_cents} usd={p.net_usd_cents} />
            </TableCell>
            <TableCell>
              <Badge variant={p.status === PurchaseStatuses.PAID ? "secondary" : "outline"}>
                {getDropdownOptionLabel(PurchaseStatusFormOptions, p.status)}
              </Badge>
              {p.refunded_eur_cents > 0 ? (
                <span className="mt-1 block text-xs text-muted-foreground">
                  {formatEurCents(p.refunded_eur_cents)} back
                </span>
              ) : null}
            </TableCell>
            <TableCell className="text-xs text-muted-foreground">
              {p.card_brand ? (
                <span className="block capitalize">
                  {p.card_brand}
                  {p.card_country ? ` · ${p.card_country}` : ""}
                </span>
              ) : (
                <span className="block">{p.payment_method_type ?? "–"}</span>
              )}
              {p.usd_per_eur ? <span className="block">1€ = ${p.usd_per_eur}</span> : null}
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  </Table>
);
