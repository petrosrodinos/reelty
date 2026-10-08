import axiosInstance from "@/config/api/axios";
import { ApiRoutes } from "@/config/api/routes";
import type {
  CreditsOverview,
  CreditTransactions,
  CreditTransactionsQuery,
} from "@/features/credits/interfaces/credits.interfaces";

export const getCredits = async (): Promise<CreditsOverview> => {
  const response = await axiosInstance.get<CreditsOverview>(ApiRoutes.credits.prefix);
  return response.data;
};

export const getCreditTransactions = async (query: CreditTransactionsQuery = {}): Promise<CreditTransactions> => {
  const response = await axiosInstance.get<CreditTransactions>(ApiRoutes.credits.transactions, { params: query });
  return response.data;
};
