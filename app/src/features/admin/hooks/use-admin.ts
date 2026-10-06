"use client";

import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getApiErrorMessage } from "@/config/constants/dropdowns/shared/api-error-message.options";
import type { CostHistoryQuery } from "@/features/admin/interfaces/admin.interfaces";
import { getAppConfig, getCostHistory, updateAppConfig } from "@/features/admin/services/admin.services";
import { toast } from "@/hooks/use-toast";

export const APP_CONFIG_QUERY_KEY = "admin-app-config";
export const COST_HISTORY_QUERY_KEY = "admin-cost-history";

/** Provider prices and fallbacks (admin only). */
export const useAppConfig = () => {
  return useQuery({ queryKey: [APP_CONFIG_QUERY_KEY], queryFn: getAppConfig, staleTime: 30_000 });
};

export const useUpdateAppConfig = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAppConfig,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [APP_CONFIG_QUERY_KEY] });
      toast({ title: "Price saved", description: "It applies to usage recorded from now on." });
    },
    onError: (error) => {
      toast({ title: "Could not save the price", description: getApiErrorMessage(error), variant: "error" });
    },
  });
};

/** Paginated cost ledger across all users, with totals over the filtered set (admin only). */
export const useCostHistory = (query: CostHistoryQuery = {}) => {
  return useQuery({
    queryKey: [COST_HISTORY_QUERY_KEY, query],
    queryFn: () => getCostHistory(query),
    placeholderData: keepPreviousData,
    staleTime: 15_000,
  });
};
