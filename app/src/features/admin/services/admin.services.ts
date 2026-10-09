import axiosInstance from "@/config/api/axios";
import { ApiRoutes } from "@/config/api/routes";
import type { AdminUserOption, AppConfigItem, CostHistory, CostHistoryQuery } from "@/features/admin/interfaces/admin.interfaces";
import type { Analytics, AnalyticsRange } from "@/features/admin/interfaces/analytics.interfaces";
import type { AdminPurchases, AdminPurchasesQuery } from "@/features/billing/interfaces/billing.interfaces";
import type { CreditTier } from "@/features/credits/interfaces/credits.interfaces";

/** One row of the tier set sent to the API; rows without an id are created. */
export type CreditTierInput = Pick<CreditTier, "name" | "min_clips" | "max_clips" | "credits" | "is_default"> & {
  id?: string;
};

export const getAnalytics = async (range: AnalyticsRange): Promise<Analytics> => {
  const response = await axiosInstance.get<Analytics>(ApiRoutes.admin.analytics, { params: { range } });
  return response.data;
};

export const getAppConfig = async (): Promise<AppConfigItem[]> => {
  const response = await axiosInstance.get<AppConfigItem[]>(ApiRoutes.admin.config);
  return response.data;
};

export const updateAppConfig = async (input: { key: string; value: number }): Promise<AppConfigItem> => {
  const response = await axiosInstance.patch<AppConfigItem>(ApiRoutes.admin.configByKey(input.key), {
    value: input.value,
  });
  return response.data;
};

export const getCostHistory = async (query: CostHistoryQuery = {}): Promise<CostHistory> => {
  const response = await axiosInstance.get<CostHistory>(ApiRoutes.admin.usage, { params: query });
  return response.data;
};

export const getAdminUsers = async (): Promise<AdminUserOption[]> => {
  const response = await axiosInstance.get<AdminUserOption[]>(ApiRoutes.admin.users);
  return response.data;
};

export const adjustUserCredits = async (input: {
  userId: string;
  credits: number;
  note?: string;
}): Promise<{ user_id: string; balance: number }> => {
  const response = await axiosInstance.post<{ user_id: string; balance: number }>(
    ApiRoutes.admin.userCredits(input.userId),
    { credits: input.credits, note: input.note || undefined },
  );
  return response.data;
};

export const getCreditTiers = async (): Promise<CreditTier[]> => {
  const response = await axiosInstance.get<CreditTier[]>(ApiRoutes.admin.creditTiers);
  return response.data;
};

/** Replaces the whole tier set; the API validates it as a whole. */
export const replaceCreditTiers = async (tiers: CreditTierInput[]): Promise<CreditTier[]> => {
  const response = await axiosInstance.put<CreditTier[]>(ApiRoutes.admin.creditTiers, { tiers });
  return response.data;
};

export const getAdminPurchases = async (query: AdminPurchasesQuery = {}): Promise<AdminPurchases> => {
  const response = await axiosInstance.get<AdminPurchases>(ApiRoutes.admin.purchases, { params: query });
  return response.data;
};
