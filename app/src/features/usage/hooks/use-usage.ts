"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { UsageHistoryQuery } from "@/features/usage/interfaces/usage.interfaces";
import { getUsage, getUsageHistory } from "@/features/usage/services/usage.services";

export const USAGE_QUERY_KEY = "usage";
export const USAGE_HISTORY_QUERY_KEY = "usage-history";

/** Monthly quota plus the user's single active render (if any). Refreshed while a render is active. */
export const useUsage = (options: { enabled?: boolean } = {}) => {
  return useQuery({
    queryKey: [USAGE_QUERY_KEY],
    queryFn: getUsage,
    enabled: options.enabled ?? true,
    staleTime: 15_000,
    refetchInterval: (query) => (query.state.data?.active_render_project_id ? 10_000 : false),
  });
};

/** Paginated quota activity (video charges and refunds). */
export const useUsageHistory = (query: UsageHistoryQuery = {}) => {
  return useQuery({
    queryKey: [USAGE_HISTORY_QUERY_KEY, query],
    queryFn: () => getUsageHistory(query),
    placeholderData: keepPreviousData,
    staleTime: 15_000,
  });
};
