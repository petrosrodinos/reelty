import type { FC } from "react";
import { Trash2Icon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { AdminUserOption } from "@/features/admin/interfaces/admin.interfaces";
import { formatProjectDate } from "@/lib/format.utils";

interface AdminUsersTableProps {
  users: AdminUserOption[];
  onDelete: (user: AdminUserOption) => void;
}

export const AdminUsersTable: FC<AdminUsersTableProps> = ({ users, onDelete }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>User</TableHead>
        <TableHead>Role</TableHead>
        <TableHead className="text-right">Credits</TableHead>
        <TableHead className="text-right">Videos</TableHead>
        <TableHead>Joined</TableHead>
        <TableHead className="text-right">
          <span className="sr-only">Actions</span>
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {users.map((user) => (
        <TableRow key={user.id}>
          <TableCell className="max-w-64">
            <span className="block truncate">{user.email}</span>
            <span className="block truncate text-xs text-muted-foreground">
              {user.full_name ?? "No name"}
              {user.email_verified_at ? "" : " · unverified"}
            </span>
          </TableCell>
          <TableCell>
            <Badge variant={user.role === "USER" ? "outline" : "secondary"}>
              {user.role.toLowerCase().replace("_", " ")}
            </Badge>
          </TableCell>
          <TableCell className="text-right tabular-nums">{user.credit_balance}</TableCell>
          <TableCell className="text-right tabular-nums">{user.projects_count}</TableCell>
          <TableCell className="whitespace-nowrap">{formatProjectDate(user.created_at)}</TableCell>
          <TableCell className="text-right">
            {user.role === "USER" ? (
              <Button variant="ghost" size="sm" aria-label={`Delete ${user.email}`} onClick={() => onDelete(user)}>
                <Trash2Icon className="size-4" />
                Delete
              </Button>
            ) : null}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
