"use client";

import { useState, type FC } from "react";
import { ReceiptTextIcon, WifiOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatePanel } from "@/components/ui/state-panel";
import { LedgerKindFilterOptions } from "@/config/constants/dropdowns/usage/ledger-kind-filter.options";
import type { LedgerKind } from "@/features/usage/interfaces/usage.interfaces";
import { useUsage, useUsageHistory } from "@/features/usage/hooks/use-usage";
import { QuotaSummary } from "@/views/usage/components/quota-summary";
import { UsageSkeleton } from "@/views/usage/components/usage-skeleton";
import { UsageTable } from "@/views/usage/components/usage-table";

const kindItems = LedgerKindFilterOptions.map((option) => ({ value: option.id, label: option.label }));

const UsagePage: FC = () => {
  const [kind, setKind] = useState<LedgerKind | "all">("all");
  const [page, setPage] = useState(1);

  const { data, isPending, error, refetch, isFetching } = useUsageHistory({
    page,
    kind: kind === "all" ? undefined : kind,
  });

  const { data: usage } = useUsage();

  const entries = data?.data ?? [];
  const pagination = data?.pagination;
  const filtered = kind !== "all";

  return (
    <div className="page-container py-10 md:py-14">
      <div className="mb-8">
        <p className="text-eyebrow text-muted-foreground">Account</p>
        <h1 className="text-display-lg mt-2">Usage</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Every video charged to or refunded from your monthly quota, newest first.
        </p>
      </div>

      {usage ? <QuotaSummary usage={usage} /> : null}

      <div className="mb-8 flex flex-wrap items-center gap-3">
        <Select
          value={kind}
          onValueChange={(value) => {
            setKind(value as LedgerKind | "all");
            setPage(1);
          }}
          items={kindItems}
        >
          <SelectTrigger aria-label="Filter by activity" className="h-11 w-full sm:w-56">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {LedgerKindFilterOptions.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {pagination ? (
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {pagination.total} {pagination.total === 1 ? "entry" : "entries"}
          </p>
        ) : null}
      </div>

      {isPending ? (
        <UsageSkeleton />
      ) : error ? (
        <StatePanel
          icon={<WifiOffIcon className="size-6" />}
          title="We could not load your usage"
          description={error.message}
        >
          <Button onClick={() => refetch()} disabled={isFetching}>
            Try again
          </Button>
        </StatePanel>
      ) : entries.length === 0 ? (
        <StatePanel
          icon={<ReceiptTextIcon className="size-6" />}
          title={filtered ? "Nothing here" : "No usage yet"}
          description={
            filtered ? "No entries match this filter." : "Your quota activity shows up here once you create a video."
          }
        >
          {filtered ? (
            <Button variant="outline" onClick={() => setKind("all")}>
              Clear filter
            </Button>
          ) : null}
        </StatePanel>
      ) : (
        <div className="flex flex-col gap-8">
          <UsageTable entries={entries} />
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

export default UsagePage;
