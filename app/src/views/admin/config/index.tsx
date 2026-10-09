"use client";

import type { FC } from "react";
import { SettingsIcon, WifiOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { StatePanel } from "@/components/ui/state-panel";
import {
  useAdminPurchases,
  useAppConfig,
  useCreditTiers,
  useUpdateAppConfig,
} from "@/features/admin/hooks/use-admin";
import { AdminGuard } from "@/views/admin/components/admin-guard";
import { AdminTabs } from "@/views/admin/components/admin-tabs";
import { ConfigRow } from "@/views/admin/config/components/config-row";
import { CREDITS_PER_EUR_KEY, UnitEconomicsCalculator } from "@/views/admin/config/components/unit-economics-calculator";

const ConfigSkeleton: FC = () => (
  <div className="flex flex-col gap-px overflow-hidden rounded-lg border border-hairline" aria-busy="true" aria-label="Loading prices">
    {Array.from({ length: 5 }).map((_, index) => (
      <Skeleton key={index} className="h-24 w-full rounded-none" />
    ))}
  </div>
);

const AdminConfigContent: FC = () => {
  const { data, isPending, error, refetch, isFetching } = useAppConfig();
  const update = useUpdateAppConfig();
  const tiers = useCreditTiers();
  // Only the summary is needed: its average fee comes from the fees Stripe reported on each paid purchase.
  const purchases = useAdminPurchases({ limit: 1 });
  const feeSummary = purchases.data?.summary;
  const rateItem = data?.find((item) => item.key === CREDITS_PER_EUR_KEY);

  return (
    <div className="page-container py-10 md:py-14">
      <div className="mb-8">
        <p className="text-eyebrow text-muted-foreground">Admin</p>
        <h1 className="text-display-lg mt-2">Prices</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          What each provider costs us and what credits sell for. Provider prices turn usage into dollars when a
          provider does not report its own cost; credit settings are whole numbers. Changes apply from now on; past
          entries keep the price they were recorded with.
        </p>
      </div>

      <AdminTabs />

      {isPending ? (
        <ConfigSkeleton />
      ) : error ? (
        <StatePanel
          icon={<WifiOffIcon className="size-6" />}
          title="We could not load the prices"
          description={error.message}
        >
          <Button onClick={() => refetch()} disabled={isFetching}>
            Try again
          </Button>
        </StatePanel>
      ) : data.length === 0 ? (
        <StatePanel icon={<SettingsIcon className="size-6" />} title="No prices configured" />
      ) : (
        <>
          {tiers.data ? (
            <UnitEconomicsCalculator
              key={rateItem?.updated_at ?? "default"}
              items={data}
              tiers={tiers.data}
              stripeFeePct={feeSummary?.purchases ? feeSummary.avg_fee_pct : null}
              feeSamples={feeSummary?.purchases ?? 0}
              isSaving={update.isPending && update.variables?.key === CREDITS_PER_EUR_KEY}
              onSaveCreditsPerEur={(value) => update.mutate({ key: CREDITS_PER_EUR_KEY, value })}
            />
          ) : tiers.isPending ? (
            <Skeleton className="mb-8 h-96 w-full rounded-lg" aria-label="Loading the calculator" />
          ) : null}
          <div className="divide-y divide-hairline overflow-hidden rounded-lg border border-hairline">
            {data.map((item) => (
              <ConfigRow
                key={`${item.key}-${item.updated_at ?? "default"}`}
                item={item}
                isSaving={update.isPending && update.variables?.key === item.key}
                onSave={(value) => update.mutate({ key: item.key, value })}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const AdminConfigPage: FC = () => (
  <AdminGuard>
    <AdminConfigContent />
  </AdminGuard>
);

export default AdminConfigPage;
