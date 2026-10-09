"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { ME_QUERY_KEY } from "@/features/auth/hooks/use-auth";
import { PURCHASES_QUERY_KEY } from "@/features/billing/hooks/use-billing";
import { CREDIT_TRANSACTIONS_QUERY_KEY, CREDITS_QUERY_KEY } from "@/features/credits/hooks/use-credits";
import { toast } from "@/hooks/use-toast";
import { QueryParams } from "@/routes/routes";

/** Stripe fulfils through a webhook, so after returning we refresh the balance for a short while. */
const POLL_MS = 3_000;
const POLL_FOR_MS = 30_000;

/** Handles the `?status=` Stripe sends the buyer back with: cleans the URL, toasts and refreshes the balance. */
export const useCheckoutReturn = (returnPath: string) => {
  const status = useSearchParams().get(QueryParams.status);
  const router = useRouter();
  const queryClient = useQueryClient();
  const handled = useRef(false);

  useEffect(() => {
    if (!status || handled.current) return;
    handled.current = true;
    router.replace(returnPath);

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
  }, [status, returnPath, router, queryClient]);
};
