"use client";

import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { getApiErrorMessage } from "@/config/constants/dropdowns/shared/api-error-message.options";
import type { PurchasesQuery } from "@/features/billing/interfaces/billing.interfaces";
import { createCheckout, getPurchases } from "@/features/billing/services/billing.services";
import { AnalyticsEvents, trackEvent } from "@/lib/analytics.utils";
import { toast } from "@/hooks/use-toast";

export const PURCHASES_QUERY_KEY = "purchases";

/** Starts a Stripe Checkout and sends the browser to the hosted payment page. */
export const useCreateCheckout = () => {
  return useMutation({
    mutationFn: createCheckout,
    onSuccess: ({ url }) => {
      trackEvent(AnalyticsEvents.BEGIN_CHECKOUT, { currency: "EUR" });
      window.location.assign(url);
    },
    onError: (error) => {
      toast({ title: "Could not start the payment", description: getApiErrorMessage(error), variant: "error" });
    },
  });
};

/** The user's completed purchases, newest first. */
export const usePurchases = (query: PurchasesQuery = {}) => {
  return useQuery({
    queryKey: [PURCHASES_QUERY_KEY, query],
    queryFn: () => getPurchases(query),
    placeholderData: keepPreviousData,
    staleTime: 15_000,
  });
};
