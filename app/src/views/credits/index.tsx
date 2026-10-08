"use client";

import { useEffect, useRef, type FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { CoinsIcon, WifiOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { StatePanel } from "@/components/ui/state-panel";
import { ME_QUERY_KEY } from "@/features/auth/hooks/use-auth";
import { PURCHASES_QUERY_KEY } from "@/features/billing/hooks/use-billing";
import { CREDIT_TRANSACTIONS_QUERY_KEY, CREDITS_QUERY_KEY, useCredits } from "@/features/credits/hooks/use-credits";
import { toast } from "@/hooks/use-toast";
import { pluralize } from "@/lib/format.utils";
import { QueryParams, Routes } from "@/routes/routes";
import { BuyCreditsCard } from "@/views/credits/components/buy-credits-card";
import { PricingTable } from "@/views/credits/components/pricing-table";

/** Stripe fulfils through a webhook, so after returning we refresh the balance for a short while. */
const POLL_MS = 3_000;
const POLL_FOR_MS = 30_000;

const useCheckoutReturn = () => {
  const status = useSearchParams().get(QueryParams.status);
  const router = useRouter();
  const queryClient = useQueryClient();
  const handled = useRef(false);

  useEffect(() => {
    if (!status || handled.current) return;
    handled.current = true;
    router.replace(Routes.credits);

    if (status !== "success") {
      toast({ title: "Payment cancelled", description: "No charge was made.", variant: "info" });
      return;
    }

    toast({ title: "Payment received", description: "Your credits will appear in a moment." });
    const refresh = () => {
      for (const key of [ME_QUERY_KEY, CREDITS_QUERY_KEY, CREDIT_TRANSACTIONS_QUERY_KEY, PURCHASES_QUERY_KEY]) {
        queryClient.invalidateQueries({ queryKey: [key] });
      }
    };
    refresh();
    const interval = window.setInterval(refresh, POLL_MS);
    const stop = window.setTimeout(() => window.clearInterval(interval), POLL_FOR_MS);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(stop);
    };
  }, [status, router, queryClient]);
};

const CreditsPage: FC = () => {
  useCheckoutReturn();
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
