"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { CreditTransactionsQuery } from "@/features/credits/interfaces/credits.interfaces";
import { getCredits, getCreditTransactions } from "@/features/credits/services/credits.services";

export const CREDITS_QUERY_KEY = "credits";
export const CREDIT_TRANSACTIONS_QUERY_KEY = "credit-transactions";

/** Balance plus current pricing (tiers, add-ons, credits per euro). */
export const useCredits = () => {
  return useQuery({ queryKey: [CREDITS_QUERY_KEY], queryFn: getCredits, staleTime: 30_000 });
};

/** Paginated credit history (grants, purchases, video charges and refunds). */
export const useCreditTransactions = (query: CreditTransactionsQuery = {}) => {
  return useQuery({
    queryKey: [CREDIT_TRANSACTIONS_QUERY_KEY, query],
    queryFn: () => getCreditTransactions(query),
    placeholderData: keepPreviousData,
    staleTime: 15_000,
  });
};
