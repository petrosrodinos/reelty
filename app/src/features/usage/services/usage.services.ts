import axiosInstance from "@/config/api/axios";
import { ApiRoutes } from "@/config/api/routes";
import type { Usage } from "@/features/usage/interfaces/usage.interfaces";

export const getUsage = async (): Promise<Usage> => {
  const response = await axiosInstance.get<Usage>(ApiRoutes.usage.prefix);
  return response.data;
};
