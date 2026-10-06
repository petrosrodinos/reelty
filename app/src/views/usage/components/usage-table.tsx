import type { FC } from "react";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LedgerKindFormOptions } from "@/config/constants/dropdowns/usage/ledger-kind-form.options";
import { LedgerKinds, type LedgerEntry } from "@/features/usage/interfaces/usage.interfaces";
import { getDropdownOptionLabel } from "@/lib/dropdown-option-label.utils";
import { formatProjectDate } from "@/lib/format.utils";
import { Routes } from "@/routes/routes";

interface UsageTableProps {
  entries: LedgerEntry[];
}

function formatQuota(units: number): string {
  return `${units > 0 ? "+" : ""}${units} ${Math.abs(units) === 1 ? "video" : "videos"}`;
}

export const UsageTable: FC<UsageTableProps> = ({ entries }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Date</TableHead>
        <TableHead>Activity</TableHead>
        <TableHead>Project</TableHead>
        <TableHead className="text-right">Quota</TableHead>
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
            <Badge variant={entry.kind === LedgerKinds.VIDEO_REFUND ? "outline" : "secondary"}>
              {getDropdownOptionLabel(LedgerKindFormOptions, entry.kind)}
            </Badge>
          </TableCell>
          <TableCell className="max-w-56 truncate">
            {entry.project_id ? (
              <Link href={Routes.project(entry.project_id)} className="underline-offset-4 hover:underline">
                {entry.project_title || "Untitled video"}
              </Link>
            ) : (
              <span className="text-muted-foreground">Deleted project</span>
            )}
          </TableCell>
          <TableCell className="text-right whitespace-nowrap tabular-nums">{formatQuota(entry.quota_units)}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
