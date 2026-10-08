import axiosInstance from "@/config/api/axios";
import { ApiRoutes } from "@/config/api/routes";
import type { AdminUserOption, AppConfigItem, CostHistory, CostHistoryQuery } from "@/features/admin/interfaces/admin.interfaces";

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
