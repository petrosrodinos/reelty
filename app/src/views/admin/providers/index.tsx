"use client";

import type { FC } from "react";
import { RefreshCwIcon, WifiOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { StatePanel } from "@/components/ui/state-panel";
import type { ProviderBalance, ProviderMetric, ProviderStatus } from "@/features/admin/interfaces/admin.interfaces";
import { useProviderBalances } from "@/features/admin/hooks/use-admin";
import { cn } from "@/lib/utils";
import { AdminGuard } from "@/views/admin/components/admin-guard";
import { AdminTabs } from "@/views/admin/components/admin-tabs";

const statusLabel: Record<ProviderStatus, string> = {
  ok: "Connected",
  not_configured: "Not configured",
  unavailable: "Balance unavailable",
};

const formatValue = (metric: ProviderMetric, value: number) =>
  metric.unit === "usd" ? `$${value.toFixed(2)}` : metric.unit === "credits" ? `${value.toLocaleString()} credits` : value.toLocaleString();

/** Share of the cap in use (0 to 1); null when there is no cap. */
const usedShare = (metric: ProviderMetric) => (metric.limit && metric.limit > 0 ? Math.min(metric.value / metric.limit, 1) : null);

const MetricRow: FC<{ metric: ProviderMetric }> = ({ metric }) => {
  const share = usedShare(metric);
  const hot = metric.kind === "used" && share !== null && share >= 0.8;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-sm text-muted-foreground">{metric.label}</p>
        <p className={cn("text-[1.375rem] font-medium tabular-nums text-ink", hot && "text-error")}>
          {formatValue(metric, metric.value)}
          {metric.limit !== null ? <span className="text-sm font-normal text-muted-foreground"> / {formatValue(metric, metric.limit)}</span> : null}
        </p>
      </div>
      {share !== null ? (
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-card" role="presentation">
          <div className={cn("h-full rounded-full", hot ? "bg-error" : "bg-brand")} style={{ width: `${share * 100}%` }} />
        </div>
      ) : null}
    </div>
  );
};

const ProviderCard: FC<{ provider: ProviderBalance }> = ({ provider }) => (
  <section aria-labelledby={`provider-${provider.key}`} className="flex flex-col gap-4 rounded-lg border border-hairline bg-canvas p-5">
    <div className="flex items-center justify-between gap-3">
      <h2 id={`provider-${provider.key}`} className="text-lg font-medium text-ink">
        {provider.name}
      </h2>
      <span
        className={cn(
          "rounded-full px-2.5 py-0.5 text-xs font-medium text-ink",
          provider.status === "ok" ? "bg-notice-ok" : provider.status === "unavailable" ? "bg-notice-warn" : "bg-notice-bad",
        )}
      >
        {statusLabel[provider.status]}
      </span>
    </div>
    {provider.metrics.map((metric) => (
      <MetricRow key={metric.label} metric={metric} />
    ))}
    {provider.note ? <p className="text-sm text-muted-foreground">{provider.note}</p> : null}
    {provider.resets_at ? (
      <p className="text-[0.8125rem] text-muted-foreground">Resets {new Date(provider.resets_at).toLocaleDateString()}</p>
    ) : null}
  </section>
);

const AdminProvidersContent: FC = () => {
  const { data, isPending, error, refetch, isFetching } = useProviderBalances();
  return (
    <div className="page-container py-10 md:py-14">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-eyebrow text-muted-foreground">Admin</p>
          <h1 className="text-display-lg mt-2">Providers</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            What is left on each provider account, read live from the provider. Top up before a balance runs out, since renders
            fail fast when a provider has no credits.
          </p>
        </div>
        <Button variant="outline" onClick={() => refetch()} disabled={isFetching}>
          <RefreshCwIcon className={cn(isFetching && "animate-spin")} /> Refresh
        </Button>
      </div>

      <AdminTabs />

      {isPending ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3" aria-busy="true" aria-label="Loading providers">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-44 w-full rounded-lg" />
          ))}
        </div>
      ) : error ? (
        <StatePanel icon={<WifiOffIcon className="size-6" />} title="We could not load the providers" description={error.message}>
          <Button onClick={() => refetch()} disabled={isFetching}>
            Try again
          </Button>
        </StatePanel>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {data.map((provider) => (
            <ProviderCard key={provider.key} provider={provider} />
          ))}
        </div>
      )}
    </div>
  );
};

const AdminProvidersPage: FC = () => (
  <AdminGuard>
    <AdminProvidersContent />
  </AdminGuard>
);

export default AdminProvidersPage;
