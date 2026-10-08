"use client";

import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getApiErrorMessage } from "@/config/constants/dropdowns/shared/api-error-message.options";
import type { CostHistoryQuery } from "@/features/admin/interfaces/admin.interfaces";
import {
  adjustUserCredits,
  getAdminPurchases,
  getAdminUsers,
  getAppConfig,
  getCostHistory,
  getCreditTiers,
  replaceCreditTiers,
  updateAppConfig,
} from "@/features/admin/services/admin.services";
import type { AdminPurchasesQuery } from "@/features/billing/interfaces/billing.interfaces";
import { CREDITS_QUERY_KEY } from "@/features/credits/hooks/use-credits";
import { toast } from "@/hooks/use-toast";

export const APP_CONFIG_QUERY_KEY = "admin-app-config";
export const ADMIN_USERS_QUERY_KEY = "admin-users";
export const COST_HISTORY_QUERY_KEY = "admin-cost-history";
export const CREDIT_TIERS_QUERY_KEY = "admin-credit-tiers";
export const ADMIN_PURCHASES_QUERY_KEY = "admin-purchases";

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
      queryClient.invalidateQueries({ queryKey: [CREDITS_QUERY_KEY] });
      toast({ title: "Price saved", description: "It applies from now on." });
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

/** Every user, for the admin filter dropdown. */
export const useAdminUsers = () => {
  return useQuery({ queryKey: [ADMIN_USERS_QUERY_KEY], queryFn: getAdminUsers, staleTime: 60_000 });
};

/** Add or remove credits for one user (admin only). */
export const useAdjustUserCredits = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adjustUserCredits,
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_USERS_QUERY_KEY] });
      toast({ title: "Credits updated", description: `New balance: ${result.balance} credits.` });
    },
    onError: (error) => {
      toast({ title: "Could not update credits", description: getApiErrorMessage(error), variant: "error" });
    },
  });
};

/** Video price tiers (admin only). */
export const useCreditTiers = () => {
  return useQuery({ queryKey: [CREDIT_TIERS_QUERY_KEY], queryFn: getCreditTiers, staleTime: 30_000 });
};

export const useReplaceCreditTiers = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: replaceCreditTiers,
    onSuccess: (tiers) => {
      queryClient.setQueryData([CREDIT_TIERS_QUERY_KEY], tiers);
      queryClient.invalidateQueries({ queryKey: [CREDITS_QUERY_KEY] });
      toast({ title: "Tiers saved", description: "New prices apply to videos created from now on." });
    },
    onError: (error) => {
      toast({ title: "Could not save the tiers", description: getApiErrorMessage(error), variant: "error" });
    },
  });
};

/** Credit purchases across users with Stripe fees and totals (admin only). */
export const useAdminPurchases = (query: AdminPurchasesQuery = {}) => {
  return useQuery({
    queryKey: [ADMIN_PURCHASES_QUERY_KEY, query],
    queryFn: () => getAdminPurchases(query),
    placeholderData: keepPreviousData,
    staleTime: 15_000,
  });
};
