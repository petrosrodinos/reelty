"use client";

import { useState, type FC } from "react";
import { UsersIcon, WifiOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfirmationDialog from "@/components/ui/confirmation-dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { StatePanel } from "@/components/ui/state-panel";
import { useAdminUsers, useDeleteAdminUser } from "@/features/admin/hooks/use-admin";
import type { AdminUserOption } from "@/features/admin/interfaces/admin.interfaces";
import { AdminGuard } from "@/views/admin/components/admin-guard";
import { AdminTabs } from "@/views/admin/components/admin-tabs";
import { AdminUsersTable } from "@/views/admin/users/components/users-table";

const AdminUsersContent: FC = () => {
  const [search, setSearch] = useState("");
  const [pendingDelete, setPendingDelete] = useState<AdminUserOption | null>(null);
  const { data: users, isPending, error, refetch, isFetching } = useAdminUsers();
  const deleteUser = useDeleteAdminUser();

  const term = search.trim().toLowerCase();
  const visible = (users ?? []).filter(
    (user) => !term || user.email.toLowerCase().includes(term) || (user.full_name ?? "").toLowerCase().includes(term),
  );

  const confirmDelete = () => {
    if (!pendingDelete) return;
    deleteUser.mutate(pendingDelete.id, { onSettled: () => setPendingDelete(null) });
  };

  return (
    <div className="page-container py-10 md:py-14">
      <div className="mb-8">
        <p className="text-eyebrow text-muted-foreground">Admin</p>
        <h1 className="text-display-lg mt-2">Users</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Every account. Deleting a user permanently removes their videos, photos and files from cloud storage,
          purchases, credits and usage history. This cannot be undone.
        </p>
      </div>

      <AdminTabs />

      <div className="mb-8 flex flex-wrap items-center gap-3">
        <Input
          type="search"
          aria-label="Search users"
          placeholder="Search by email or name"
          className="h-11 w-full sm:w-80"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        {users ? (
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {visible.length} {visible.length === 1 ? "user" : "users"}
          </p>
        ) : null}
      </div>

      {isPending ? (
        <div className="flex flex-col gap-3" aria-busy="true" aria-label="Loading users">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-12 w-full rounded-lg" />
          ))}
        </div>
      ) : error ? (
        <StatePanel icon={<WifiOffIcon className="size-6" />} title="We could not load the users" description={error.message}>
          <Button onClick={() => refetch()} disabled={isFetching}>
            Try again
          </Button>
        </StatePanel>
      ) : visible.length === 0 ? (
        <StatePanel
          icon={<UsersIcon className="size-6" />}
          title={term ? "Nothing here" : "No users yet"}
          description={term ? "No user matches this search." : "Accounts appear here once people sign up."}
        />
      ) : (
        <AdminUsersTable users={visible} onDelete={setPendingDelete} />
      )}

      <ConfirmationDialog
        isOpen={pendingDelete !== null}
        onClose={() => setPendingDelete(null)}
        onConfirm={confirmDelete}
        isLoading={deleteUser.isPending}
        variant="destructive"
        title="Delete this user?"
        description={`${pendingDelete?.email ?? "This user"} and everything they own will be permanently deleted: ${pendingDelete?.projects_count ?? 0} video project(s), all photos and videos in cloud storage, purchases, credits and usage history. This cannot be undone.`}
        confirmText="Delete permanently"
      />
    </div>
  );
};

const AdminUsersPage: FC = () => (
  <AdminGuard>
    <AdminUsersContent />
  </AdminGuard>
);

export default AdminUsersPage;
