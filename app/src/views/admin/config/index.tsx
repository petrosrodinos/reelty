"use client";

import type { FC } from "react";
import { SettingsIcon, WifiOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { StatePanel } from "@/components/ui/state-panel";
import {
  useAdminPurchases,
  useAppConfig,
  useCreditRates,
  useCreditTiers,
  useReplaceCreditRates,
  useUpdateAppConfig,
} from "@/features/admin/hooks/use-admin";
import { AdminGuard } from "@/views/admin/components/admin-guard";
import { AdminTabs } from "@/views/admin/components/admin-tabs";
import { ConfigRow } from "@/views/admin/config/components/config-row";
import { CREDITS_PER_EUR_KEY, UnitEconomicsCalculator } from "@/views/admin/config/components/unit-economics-calculator";

/** Sections of the price list, matched on the key prefix. Keys outside every group land in "Other". */
const CONFIG_GROUPS = [
  {
    title: "Provider costs",
    description: "What Higgsfield, watermark removal and listing import cost us.",
    prefixes: ["higgsfield.", "dewatermark.", "apify."],
  },
  {
    title: "Billing",
    description: "How euros turn into credits and the limits on a single purchase.",
    prefixes: ["billing."],
  },
  {
    title: "Credits",
    description: "Free credits and what each add-on costs customers.",
    prefixes: ["credits."],
  },
];

const OTHER_GROUP = { title: "Other", description: "", prefixes: [] as string[] };

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
  const creditRates = useCreditRates();
  const replaceRates = useReplaceCreditRates();
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
          {tiers.data && creditRates.data ? (
            <UnitEconomicsCalculator
              // Remount after either save so the drafts restart from what is stored.
              key={`${rateItem?.updated_at ?? "default"}-${creditRates.dataUpdatedAt}`}
              items={data}
              tiers={tiers.data}
              rateTiers={creditRates.data}
              stripeFeePct={feeSummary?.purchases ? feeSummary.avg_fee_pct : null}
              feeSamples={feeSummary?.purchases ?? 0}
              isSaving={(update.isPending && update.variables?.key === CREDITS_PER_EUR_KEY) || replaceRates.isPending}
              onSave={({ creditsPerEur, rateTiers }) => {
                // The API keeps the base below every tier rate, checking each against the other's stored value:
                // a higher base needs the new tiers saved first, a lower base goes first.
                const saveBase = (then?: () => void) =>
                  creditsPerEur === undefined
                    ? then?.()
                    : update.mutate({ key: CREDITS_PER_EUR_KEY, value: creditsPerEur }, { onSuccess: then });
                const saveTiers = (then?: () => void) =>
                  rateTiers ? replaceRates.mutate(rateTiers, { onSuccess: then }) : then?.();
                if (creditsPerEur !== undefined && creditsPerEur > (rateItem?.value ?? 0)) saveTiers(() => saveBase());
                else saveBase(() => saveTiers());
              }}
            />
          ) : tiers.isPending || creditRates.isPending ? (
            <Skeleton className="mb-8 h-96 w-full rounded-lg" aria-label="Loading the calculator" />
          ) : null}
          <div className="flex flex-col gap-10">
            {[...CONFIG_GROUPS, OTHER_GROUP].map((group) => {
              const items = data.filter((item) =>
                group === OTHER_GROUP
                  ? !CONFIG_GROUPS.some((known) => known.prefixes.some((prefix) => item.key.startsWith(prefix)))
                  : group.prefixes.some((prefix) => item.key.startsWith(prefix)),
              );
              if (items.length === 0) return null;
              return (
                <section key={group.title} aria-labelledby={`config-group-${group.title}`}>
                  <h2 id={`config-group-${group.title}`} className="text-lg font-medium text-ink">
                    {group.title}
                  </h2>
                  <p className="mb-3 mt-1 text-sm text-muted-foreground">{group.description}</p>
                  <div className="divide-y divide-hairline overflow-hidden rounded-lg border border-hairline">
                    {items.map((item) => (
                      <ConfigRow
                        key={`${item.key}-${item.updated_at ?? "default"}`}
                        item={item}
                        isSaving={update.isPending && update.variables?.key === item.key}
                        onSave={(value) => update.mutate({ key: item.key, value })}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
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
