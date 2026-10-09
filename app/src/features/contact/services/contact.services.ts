import axiosInstance from "@/config/api/axios";
import { ApiRoutes } from "@/config/api/routes";
import type { MessageResponse } from "@/features/auth/interfaces/auth.interfaces";
import type { ContactFormData } from "@/features/contact/validation-schemas/contact.schema";

export const sendContactMessage = async (dto: ContactFormData): Promise<MessageResponse> => {
  const response = await axiosInstance.post<MessageResponse>(ApiRoutes.contact, dto);
  return response.data;
};
