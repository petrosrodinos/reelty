import type { FC } from "react";
import { format, parseISO } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PurchaseStatusFormOptions } from "@/config/constants/dropdowns/billing/purchase-status-form.options";
import { PurchaseStatuses, type Purchase } from "@/features/billing/interfaces/billing.interfaces";
import { getDropdownOptionLabel } from "@/lib/dropdown-option-label.utils";
import { formatEurCents, formatProjectDate } from "@/lib/format.utils";

interface PurchasesTableProps {
  purchases: Purchase[];
}

export const PurchasesTable: FC<PurchasesTableProps> = ({ purchases }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Date</TableHead>
        <TableHead className="text-right">Credits</TableHead>
        <TableHead className="text-right">Amount</TableHead>
        <TableHead>Status</TableHead>
        <TableHead className="text-right">Receipt</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {purchases.map((purchase) => {
        const at = purchase.paid_at ?? purchase.failed_at ?? purchase.created_at;
        const failed = purchase.status === PurchaseStatuses.FAILED;
        return (
          <TableRow key={purchase.id}>
            <TableCell className="whitespace-nowrap">
              <span className="block">{formatProjectDate(at)}</span>
              <span className="block text-xs text-muted-foreground">{format(parseISO(at), "HH:mm")}</span>
            </TableCell>
            <TableCell className="text-right tabular-nums">{failed ? purchase.credits : `+${purchase.credits}`}</TableCell>
            <TableCell className="text-right whitespace-nowrap tabular-nums">
              {formatEurCents(purchase.amount_eur_cents)}
              {purchase.refunded_eur_cents > 0 ? (
                <span className="block text-xs text-muted-foreground">
                  {formatEurCents(purchase.refunded_eur_cents)} refunded
                </span>
              ) : null}
            </TableCell>
            <TableCell>
              <Badge variant={failed ? "destructive" : purchase.status === PurchaseStatuses.PAID ? "secondary" : "outline"}>
                {getDropdownOptionLabel(PurchaseStatusFormOptions, purchase.status)}
              </Badge>
              {failed && purchase.failure_message ? (
                <span className="mt-1 block max-w-64 text-xs text-muted-foreground">{purchase.failure_message}</span>
              ) : null}
            </TableCell>
            <TableCell className="text-right">
              {purchase.receipt_url ? (
                <a
                  href={purchase.receipt_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm underline-offset-4 hover:underline"
                >
                  View
                </a>
              ) : (
                <span className="text-muted-foreground">–</span>
              )}
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  </Table>
);
