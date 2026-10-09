"use client";

import { useState, type FC, type ReactNode } from "react";
import Link from "next/link";
import { CoinsIcon, ReceiptTextIcon, WifiOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatePanel } from "@/components/ui/state-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditTxKindFilterOptions } from "@/config/constants/dropdowns/credits/credit-tx-kind-filter.options";
import { usePurchases } from "@/features/billing/hooks/use-billing";
import { useCreditTransactions } from "@/features/credits/hooks/use-credits";
import type { CreditTxKind } from "@/features/credits/interfaces/credits.interfaces";
import type { Pagination } from "@/features/projects/interfaces/projects.interfaces";
import { useUsage } from "@/features/usage/hooks/use-usage";
import { pluralize } from "@/lib/format.utils";
import { Routes } from "@/routes/routes";
import { CreditHistoryTable } from "@/views/usage/components/credit-history-table";
import { PurchasesTable } from "@/views/usage/components/purchases-table";
import { UsageSkeleton } from "@/views/usage/components/usage-skeleton";

const kindItems = CreditTxKindFilterOptions.map((option) => ({ value: option.id, label: option.label }));

interface PagerProps {
  pagination: Pagination | undefined;
  isFetching: boolean;
  onPage: (page: number) => void;
}

const Pager: FC<PagerProps> = ({ pagination, isFetching, onPage }) =>
  pagination && pagination.total_pages > 1 ? (
    <nav className="flex items-center justify-center gap-4" aria-label="Pagination">
      <Button variant="outline" disabled={!pagination.has_prev || isFetching} onClick={() => onPage(pagination.page - 1)}>
        Previous
      </Button>
      <span className="text-sm text-muted-foreground">
        Page {pagination.page} of {pagination.total_pages}
      </span>
      <Button variant="outline" disabled={!pagination.has_next || isFetching} onClick={() => onPage(pagination.page + 1)}>
        Next
      </Button>
    </nav>
  ) : null;

const Section: FC<{ description: string; aside?: ReactNode; children: ReactNode }> = ({
  description,
  aside,
  children,
}) => (
  <section className="flex flex-col gap-5">
    <div className="flex flex-wrap items-end justify-between gap-3">
      <p className="text-sm text-muted-foreground">{description}</p>
      {aside}
    </div>
    {children}
  </section>
);

const PurchasesSection: FC = () => {
  const [page, setPage] = useState(1);
  const { data, isPending, error, refetch, isFetching } = usePurchases({ page, limit: 10 });
  const purchases = data?.data ?? [];

  return (
    <Section description="Credits you bought, with the amount paid in euro.">
      {isPending ? (
        <UsageSkeleton rows={3} />
      ) : error ? (
        <StatePanel icon={<WifiOffIcon className="size-6" />} title="We could not load your purchases" description={error.message}>
          <Button onClick={() => refetch()} disabled={isFetching}>
            Try again
          </Button>
        </StatePanel>
      ) : purchases.length === 0 ? (
        <StatePanel icon={<ReceiptTextIcon className="size-6" />} title="No purchases yet">
          <Button render={<Link href={Routes.credits} />} nativeButton={false}>
            Buy credits
          </Button>
        </StatePanel>
      ) : (
        <>
          <PurchasesTable purchases={purchases} />
          <Pager pagination={data?.pagination} isFetching={isFetching} onPage={setPage} />
        </>
      )}
    </Section>
  );
};

const HistorySection: FC = () => {
  const [kind, setKind] = useState<CreditTxKind | "all">("all");
  const [page, setPage] = useState(1);
  const { data, isPending, error, refetch, isFetching } = useCreditTransactions({
    page,
    kind: kind === "all" ? undefined : kind,
  });
  const entries = data?.data ?? [];
  const filtered = kind !== "all";

  return (
    <Section
      description="Every credit added to or taken from your balance, newest first."
      aside={
        <Select
          value={kind}
          onValueChange={(value) => {
            setKind(value as CreditTxKind | "all");
            setPage(1);
          }}
          items={kindItems}
        >
          <SelectTrigger aria-label="Filter by activity" className="h-11 w-full sm:w-56">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CreditTxKindFilterOptions.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      }
    >
      {isPending ? (
        <UsageSkeleton />
      ) : error ? (
        <StatePanel icon={<WifiOffIcon className="size-6" />} title="We could not load your history" description={error.message}>
          <Button onClick={() => refetch()} disabled={isFetching}>
            Try again
          </Button>
        </StatePanel>
      ) : entries.length === 0 ? (
        <StatePanel
          icon={<ReceiptTextIcon className="size-6" />}
          title={filtered ? "Nothing here" : "No activity yet"}
          description={filtered ? "No entries match this filter." : "Credit activity shows up here."}
        >
          {filtered ? (
            <Button variant="outline" onClick={() => setKind("all")}>
              Clear filter
            </Button>
          ) : null}
        </StatePanel>
      ) : (
        <>
          <CreditHistoryTable entries={entries} />
          <Pager pagination={data?.pagination} isFetching={isFetching} onPage={setPage} />
        </>
      )}
    </Section>
  );
};

const UsagePage: FC = () => {
  const { data: usage } = useUsage();

  return (
    <div className="page-container py-10 md:py-14">
      <div className="mb-8">
        <p className="text-eyebrow text-muted-foreground">Account</p>
        <h1 className="text-display-lg mt-2">Usage</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">Your credit balance, purchases and what each video cost.</p>
      </div>

      <div className="mb-10 flex flex-wrap items-center justify-between gap-4 rounded-lg border p-5">
        <div className="flex items-center gap-4">
          <CoinsIcon className="size-6 shrink-0 text-muted-foreground" aria-hidden="true" />
          <div>
            <p className="text-sm text-muted-foreground">Balance</p>
            <p className="text-2xl font-semibold tabular-nums">
              {usage ? pluralize(usage.credit_balance, "credit") : "–"}
            </p>
          </div>
        </div>
        <Button render={<Link href={Routes.credits} />} nativeButton={false}>
          Buy credits
        </Button>
      </div>

      <Tabs defaultValue="purchases" className="gap-6">
        <TabsList variant="line" className="h-10">
          <TabsTrigger value="purchases" className="flex-none px-3 text-base">
            Purchases
          </TabsTrigger>
          <TabsTrigger value="history" className="flex-none px-3 text-base">
            Credit history
          </TabsTrigger>
        </TabsList>
        <TabsContent value="purchases">
          <PurchasesSection />
        </TabsContent>
        <TabsContent value="history">
          <HistorySection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UsagePage;
