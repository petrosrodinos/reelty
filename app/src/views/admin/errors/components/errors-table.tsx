import type { FC } from "react";
import { format, parseISO } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { AdminErrorEvent } from "@/features/admin/interfaces/admin.interfaces";
import { formatProjectDate } from "@/lib/format.utils";

interface ErrorsTableProps {
  errors: AdminErrorEvent[];
}

export const ErrorsTable: FC<ErrorsTableProps> = ({ errors }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>When</TableHead>
        <TableHead>Job</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>User / project</TableHead>
        <TableHead>Error</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {errors.map((e) => (
        <TableRow key={e.id}>
          <TableCell className="whitespace-nowrap align-top">
            <span className="block">{formatProjectDate(e.created_at)}</span>
            <span className="block text-xs text-muted-foreground">{format(parseISO(e.created_at), "HH:mm:ss")}</span>
          </TableCell>
          <TableCell className="align-top">
            <span className="block whitespace-nowrap">{e.job_name}</span>
            {e.step ? <span className="block text-xs text-muted-foreground">{e.step}</span> : null}
          </TableCell>
          <TableCell className="align-top">
            <Badge variant={e.status === "warning" ? "secondary" : "destructive"}>{e.status}</Badge>
          </TableCell>
          <TableCell className="max-w-56 align-top">
            <span className="block truncate">{e.user_email}</span>
            <span className="block truncate font-mono text-xs text-muted-foreground" title={e.project_id}>
              {e.project_id}
            </span>
            <span className="block text-xs text-muted-foreground">project {e.project_status.toLowerCase()}</span>
          </TableCell>
          <TableCell className="min-w-72 whitespace-pre-wrap break-words align-top">
            {e.message ?? "—"}
            {e.project_failure_code ? (
              <span className="mt-1 block text-xs text-muted-foreground">
                User saw: {e.project_failure_reason ?? e.project_failure_code} ({e.project_failure_code})
              </span>
            ) : null}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
