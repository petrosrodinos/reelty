import axiosInstance from "@/config/api/axios";
import { ApiRoutes } from "@/config/api/routes";
import type { Usage, UsageHistory, UsageHistoryQuery } from "@/features/usage/interfaces/usage.interfaces";

export const getUsage = async (): Promise<Usage> => {
  const response = await axiosInstance.get<Usage>(ApiRoutes.usage.prefix);
  return response.data;
};

export const getUsageHistory = async (query: UsageHistoryQuery = {}): Promise<UsageHistory> => {
  const response = await axiosInstance.get<UsageHistory>(ApiRoutes.usage.history, { params: query });
  return response.data;
};
