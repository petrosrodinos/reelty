import axiosInstance from "@/config/api/axios";
import { ApiRoutes } from "@/config/api/routes";
import type {
  CheckoutResponse,
  CreateCheckoutDto,
  Purchases,
  PurchasesQuery,
} from "@/features/billing/interfaces/billing.interfaces";

export const createCheckout = async (dto: CreateCheckoutDto): Promise<CheckoutResponse> => {
  const response = await axiosInstance.post<CheckoutResponse>(ApiRoutes.billing.checkout, dto);
  return response.data;
};

export const getPurchases = async (query: PurchasesQuery = {}): Promise<Purchases> => {
  const response = await axiosInstance.get<Purchases>(ApiRoutes.billing.purchases, { params: query });
  return response.data;
};
