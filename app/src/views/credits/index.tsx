"use client";

import type { FC } from "react";
import { CoinsIcon, WifiOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { StatePanel } from "@/components/ui/state-panel";
import { useCheckoutReturn } from "@/features/billing/hooks/use-checkout-return";
import { useCredits } from "@/features/credits/hooks/use-credits";
import { pluralize } from "@/lib/format.utils";
import { Routes } from "@/routes/routes";
import { BuyCreditsCard } from "@/views/credits/components/buy-credits-card";
import { PricingTable } from "@/views/credits/components/pricing-table";

const CreditsPage: FC = () => {
  useCheckoutReturn(Routes.credits);
  const { data, isPending, error, refetch, isFetching } = useCredits();

  return (
    <div className="page-container max-w-3xl py-10 md:py-14">
      <p className="text-eyebrow text-muted-foreground">Account</p>
      <h1 className="text-display-lg mt-2">Credits</h1>
      <p className="mt-2 text-muted-foreground">Buy credits once and use them for any video. They never expire.</p>

      {isPending ? (
        <div className="mt-8 flex flex-col gap-6" aria-busy="true" aria-label="Loading credits">
          <Skeleton className="h-20 w-full rounded-lg" />
          <Skeleton className="h-64 w-full rounded-lg" />
          <Skeleton className="h-56 w-full rounded-lg" />
        </div>
      ) : error ? (
        <StatePanel
          className="mt-8"
          icon={<WifiOffIcon className="size-6" />}
          title="We could not load your credits"
          description={error.message}
        >
          <Button onClick={() => refetch()} disabled={isFetching}>
            Try again
          </Button>
        </StatePanel>
      ) : (
        <div className="mt-8 flex flex-col gap-6">
          <div className="flex items-center gap-4 rounded-lg border border-hairline bg-surface-card p-5">
            <CoinsIcon className="size-6 shrink-0 text-muted-foreground" aria-hidden="true" />
            <div>
              <p className="text-sm text-muted-foreground">Your balance</p>
              <p className="text-2xl font-semibold tabular-nums">{pluralize(data.balance, "credit")}</p>
            </div>
          </div>
          <BuyCreditsCard pricing={data.pricing} />
          <PricingTable pricing={data.pricing} />
        </div>
      )}
    </div>
  );
};

export default CreditsPage;
