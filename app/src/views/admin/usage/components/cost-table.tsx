import type { FC } from "react";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CostLedgerKindFormOptions } from "@/config/constants/dropdowns/admin/cost-ledger-kind-form.options";
import { CostLedgerKinds, type CostLedgerEntry } from "@/features/admin/interfaces/admin.interfaces";
import { getDropdownOptionLabel } from "@/lib/dropdown-option-label.utils";
import { formatCredits, formatProjectDate, formatUsd } from "@/lib/format.utils";
import { Routes } from "@/routes/routes";

interface CostTableProps {
  entries: CostLedgerEntry[];
}

const isQuotaKind = (kind: string) => kind === CostLedgerKinds.VIDEO || kind === CostLedgerKinds.VIDEO_REFUND;

export const CostTable: FC<CostTableProps> = ({ entries }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Date</TableHead>
        <TableHead>User</TableHead>
        <TableHead>Activity</TableHead>
        <TableHead>Project</TableHead>
        <TableHead className="text-right">Credits</TableHead>
        <TableHead className="text-right">Price</TableHead>
        <TableHead>Details</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {entries.map((entry) => (
        <TableRow key={entry.id}>
          <TableCell className="whitespace-nowrap">
            <span className="block">{formatProjectDate(entry.created_at)}</span>
            <span className="block text-xs text-muted-foreground">{format(parseISO(entry.created_at), "HH:mm")}</span>
          </TableCell>
          <TableCell className="max-w-48 truncate" title={entry.user_email}>
            {entry.user_email}
          </TableCell>
          <TableCell>
            <Badge variant={isQuotaKind(entry.kind) ? "outline" : "secondary"}>
              {getDropdownOptionLabel(CostLedgerKindFormOptions, entry.kind)}
            </Badge>
          </TableCell>
          <TableCell className="max-w-48 truncate">
            {entry.project_id ? (
              <Link href={Routes.project(entry.project_id)} className="underline-offset-4 hover:underline">
                {entry.project_title || "Untitled video"}
              </Link>
            ) : (
              <span className="text-muted-foreground">Deleted project</span>
            )}
          </TableCell>
          <TableCell className="text-right tabular-nums">{formatCredits(entry.credits)}</TableCell>
          <TableCell className="text-right whitespace-nowrap tabular-nums">
            {formatUsd(entry.cost_usd)}
            {entry.cost_usd !== null && entry.cost_estimated ? (
              <span className="ml-1.5 text-xs text-muted-foreground" title="Computed from configured prices">
                est.
              </span>
            ) : null}
          </TableCell>
          <TableCell className="max-w-64 truncate text-muted-foreground" title={entry.note ?? undefined}>
            {entry.note ?? "–"}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
