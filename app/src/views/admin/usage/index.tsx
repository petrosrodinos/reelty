"use client";

import { useState, type FC } from "react";
import { ReceiptTextIcon, WifiOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { StatePanel } from "@/components/ui/state-panel";
import { CostLedgerKindFilterOptions } from "@/config/constants/dropdowns/admin/cost-ledger-kind-filter.options";
import { useAdminUsers, useCostHistory } from "@/features/admin/hooks/use-admin";
import type { CostLedgerKind } from "@/features/admin/interfaces/admin.interfaces";
import { AdminGuard } from "@/views/admin/components/admin-guard";
import { AdminTabs } from "@/views/admin/components/admin-tabs";
import { CostSummaryCards } from "@/views/admin/usage/components/cost-summary";
import { CostTable } from "@/views/admin/usage/components/cost-table";

const kindItems = CostLedgerKindFilterOptions.map((option) => ({ value: option.id, label: option.label }));

const CostSkeleton: FC = () => (
  <div className="flex flex-col gap-8" aria-busy="true" aria-label="Loading cost ledger">
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

const AdminUsageContent: FC = () => {
  const [kind, setKind] = useState<CostLedgerKind | "all">("all");
  const [userId, setUserId] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [page, setPage] = useState(1);

  const { data: users } = useAdminUsers();
  const userItems = [
    { value: "all", label: "All users" },
    ...(users ?? []).map((user) => ({ value: user.id, label: user.email })),
  ];

  const { data, isPending, error, refetch, isFetching } = useCostHistory({
    page,
    kind: kind === "all" ? undefined : kind,
    user_id: userId === "all" ? undefined : userId,
    // Date inputs are local calendar days: from is the start of that day, to is the start of the day after.
    from: fromDate ? new Date(`${fromDate}T00:00:00`).toISOString() : undefined,
    to: toDate ? new Date(new Date(`${toDate}T00:00:00`).getTime() + 86_400_000).toISOString() : undefined,
  });

  const entries = data?.data ?? [];
  const pagination = data?.pagination;
  const filtered = kind !== "all" || userId !== "all" || Boolean(fromDate) || Boolean(toDate);
  const clearFilters = () => {
    setKind("all");
    setUserId("all");
    setFromDate("");
    setToDate("");
    setPage(1);
  };

  return (
    <div className="page-container py-10 md:py-14">
      <div className="mb-8">
        <p className="text-eyebrow text-muted-foreground">Admin</p>
        <h1 className="text-display-lg mt-2">Cost ledger</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Every provider charge across all users, with the credits used and what it cost us. Prices marked est. are
          computed from the Prices page; the rest are amounts the provider reported.
        </p>
      </div>

      <AdminTabs />

      <div className="mb-8 flex flex-wrap items-center gap-3">
        <Select
          value={kind}
          onValueChange={(value) => {
            setKind(value as CostLedgerKind | "all");
            setPage(1);
          }}
          items={kindItems}
        >
          <SelectTrigger aria-label="Filter by activity" className="h-11 w-full sm:w-64">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CostLedgerKindFilterOptions.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
            {pagination.total} {pagination.total === 1 ? "entry" : "entries"}
          </p>
        ) : null}
      </div>

      {isPending ? (
        <CostSkeleton />
      ) : error ? (
        <StatePanel
          icon={<WifiOffIcon className="size-6" />}
          title="We could not load the cost ledger"
          description={error.message}
        >
          <Button onClick={() => refetch()} disabled={isFetching}>
            Try again
          </Button>
        </StatePanel>
      ) : entries.length === 0 ? (
        <StatePanel
          icon={<ReceiptTextIcon className="size-6" />}
          title={filtered ? "Nothing here" : "No usage recorded yet"}
          description={
            filtered
              ? "No entries match this filter."
              : "Provider costs appear here once a scrape, watermark removal or render runs."
          }
        >
          {filtered ? (
            <Button variant="outline" onClick={clearFilters}>
              Clear filters
            </Button>
          ) : null}
        </StatePanel>
      ) : (
        <div className="flex flex-col gap-8">
          <CostSummaryCards summary={data.summary} />
          <CostTable entries={entries} />
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

const AdminUsagePage: FC = () => (
  <AdminGuard>
    <AdminUsageContent />
  </AdminGuard>
);

export default AdminUsagePage;
