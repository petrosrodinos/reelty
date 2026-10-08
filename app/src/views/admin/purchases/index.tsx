"use client";

import { useState, type FC } from "react";
import { ReceiptTextIcon, WifiOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { StatePanel } from "@/components/ui/state-panel";
import { PurchaseStatusFilterOptions } from "@/config/constants/dropdowns/billing/purchase-status-filter.options";
import { useAdminPurchases, useAdminUsers } from "@/features/admin/hooks/use-admin";
import type { PurchaseStatus } from "@/features/billing/interfaces/billing.interfaces";
import { AdminGuard } from "@/views/admin/components/admin-guard";
import { AdminTabs } from "@/views/admin/components/admin-tabs";
import { AdjustCreditsForm } from "@/views/admin/purchases/components/adjust-credits-form";
import { PurchasesSummaryCards } from "@/views/admin/purchases/components/purchases-summary";
import { AdminPurchasesTable } from "@/views/admin/purchases/components/purchases-table";

const statusItems = PurchaseStatusFilterOptions.map((option) => ({ value: option.id, label: option.label }));

const PurchasesSkeleton: FC = () => (
  <div className="flex flex-col gap-8" aria-busy="true" aria-label="Loading purchases">
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} className="h-28 w-full rounded-lg" />
      ))}
    </div>
    <div className="flex flex-col gap-3">
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton key={index} className="h-12 w-full rounded-lg" />
      ))}
    </div>
  </div>
);

const AdminPurchasesContent: FC = () => {
  const [status, setStatus] = useState<PurchaseStatus | "all">("all");
  const [userId, setUserId] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [page, setPage] = useState(1);

  const { data: users } = useAdminUsers();
  const userItems = [
    { value: "all", label: "All users" },
    ...(users ?? []).map((user) => ({ value: user.id, label: user.email })),
  ];
  const selectedUser = users?.find((user) => user.id === userId);

  const { data, isPending, error, refetch, isFetching } = useAdminPurchases({
    page,
    status: status === "all" ? undefined : status,
    user_id: userId === "all" ? undefined : userId,
    // Date inputs are local calendar days: from is the start of that day, to is the start of the day after.
    from: fromDate ? new Date(`${fromDate}T00:00:00`).toISOString() : undefined,
    to: toDate ? new Date(new Date(`${toDate}T00:00:00`).getTime() + 86_400_000).toISOString() : undefined,
  });

  const purchases = data?.data ?? [];
  const pagination = data?.pagination;
  const filtered = status !== "all" || userId !== "all" || Boolean(fromDate) || Boolean(toDate);
  const clearFilters = () => {
    setStatus("all");
    setUserId("all");
    setFromDate("");
    setToDate("");
    setPage(1);
  };

  return (
    <div className="page-container py-10 md:py-14">
      <div className="mb-8">
        <p className="text-eyebrow text-muted-foreground">Admin</p>
        <h1 className="text-display-lg mt-2">Purchases</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Every credit purchase made through Stripe, with the Stripe fee, its share of the amount and what is left
          after fees. Euro is what the buyer paid; dollar figures use the EUR/USD rate saved with each purchase.
          Totals count paid and refunded purchases only.
        </p>
      </div>

      <AdminTabs />

      <div className="mb-8 flex flex-wrap items-center gap-3">
        <Select
          value={userId}
          onValueChange={(value) => {
            setUserId(value as string);
            setPage(1);
          }}
          items={userItems}
        >
          <SelectTrigger aria-label="Filter by user" className="h-11 w-full sm:w-72">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {userItems.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={status}
          onValueChange={(value) => {
            setStatus(value as PurchaseStatus | "all");
            setPage(1);
          }}
          items={statusItems}
        >
          <SelectTrigger aria-label="Filter by status" className="h-11 w-full sm:w-52">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PurchaseStatusFilterOptions.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="date"
          aria-label="From date"
          className="h-11 w-full sm:w-40"
          value={fromDate}
          max={toDate || undefined}
          onChange={(event) => {
            setFromDate(event.target.value);
            setPage(1);
          }}
        />
        <Input
          type="date"
          aria-label="To date"
          className="h-11 w-full sm:w-40"
          value={toDate}
          min={fromDate || undefined}
          onChange={(event) => {
            setToDate(event.target.value);
            setPage(1);
          }}
        />
        {filtered ? (
          <Button variant="ghost" onClick={clearFilters}>
            Clear filters
          </Button>
        ) : null}
        {pagination ? (
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {pagination.total} {pagination.total === 1 ? "purchase" : "purchases"}
          </p>
        ) : null}
      </div>

      {selectedUser ? <AdjustCreditsForm key={selectedUser.id} user={selectedUser} /> : null}

      {isPending ? (
        <PurchasesSkeleton />
      ) : error ? (
        <StatePanel icon={<WifiOffIcon className="size-6" />} title="We could not load the purchases" description={error.message}>
          <Button onClick={() => refetch()} disabled={isFetching}>
            Try again
          </Button>
        </StatePanel>
      ) : purchases.length === 0 ? (
        <StatePanel
          icon={<ReceiptTextIcon className="size-6" />}
          title={filtered ? "Nothing here" : "No purchases yet"}
          description={filtered ? "No purchases match this filter." : "Purchases appear here once someone buys credits."}
        >
          {filtered ? (
            <Button variant="outline" onClick={clearFilters}>
              Clear filters
            </Button>
          ) : null}
        </StatePanel>
      ) : (
        <div className="flex flex-col gap-8">
          <PurchasesSummaryCards summary={data.summary} />
          <AdminPurchasesTable purchases={purchases} />
          {pagination && pagination.total_pages > 1 ? (
            <nav className="flex items-center justify-center gap-4" aria-label="Pagination">
              <Button variant="outline" disabled={!pagination.has_prev || isFetching} onClick={() => setPage(page - 1)}>
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {pagination.page} of {pagination.total_pages}
              </span>
              <Button variant="outline" disabled={!pagination.has_next || isFetching} onClick={() => setPage(page + 1)}>
                Next
              </Button>
            </nav>
          ) : null}
        </div>
      )}
    </div>
  );
};

const AdminPurchasesPage: FC = () => (
  <AdminGuard>
    <AdminPurchasesContent />
  </AdminGuard>
);

export default AdminPurchasesPage;
