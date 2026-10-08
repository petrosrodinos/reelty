import type { FC } from "react";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreditTxKindFormOptions } from "@/config/constants/dropdowns/credits/credit-tx-kind-form.options";
import type { CreditTransaction } from "@/features/credits/interfaces/credits.interfaces";
import { getDropdownOptionLabel } from "@/lib/dropdown-option-label.utils";
import { formatProjectDate } from "@/lib/format.utils";
import { cn } from "@/lib/utils";
import { Routes } from "@/routes/routes";

interface CreditHistoryTableProps {
  entries: CreditTransaction[];
}

export const CreditHistoryTable: FC<CreditHistoryTableProps> = ({ entries }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Date</TableHead>
        <TableHead>Activity</TableHead>
        <TableHead>Details</TableHead>
        <TableHead className="text-right">Credits</TableHead>
        <TableHead className="text-right">Balance</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {entries.map((entry) => (
        <TableRow key={entry.id}>
          <TableCell className="whitespace-nowrap">
            <span className="block">{formatProjectDate(entry.created_at)}</span>
            <span className="block text-xs text-muted-foreground">{format(parseISO(entry.created_at), "HH:mm")}</span>
          </TableCell>
          <TableCell>
            <Badge variant={entry.credits < 0 ? "secondary" : "outline"}>
              {getDropdownOptionLabel(CreditTxKindFormOptions, entry.kind)}
            </Badge>
          </TableCell>
          <TableCell className="max-w-64 truncate">
            {entry.project_id ? (
              <Link href={Routes.project(entry.project_id)} className="underline-offset-4 hover:underline">
                {entry.project_title || "Untitled video"}
              </Link>
            ) : (
              <span className="text-muted-foreground">{entry.note ?? "–"}</span>
            )}
          </TableCell>
          <TableCell
            className={cn(
              "text-right whitespace-nowrap tabular-nums",
              entry.credits > 0 && "text-success",
            )}
          >
            {entry.credits > 0 ? "+" : ""}
            {entry.credits}
          </TableCell>
          <TableCell className="text-right tabular-nums text-muted-foreground">{entry.balance_after}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
