import axiosInstance from "@/config/api/axios";
import { ApiRoutes } from "@/config/api/routes";
import type {
  AuthUserResponse,
  ForgotPasswordDto,
  LoginDto,
  MessageResponse,
  Me,
  RegisterDto,
  ResetPasswordDto,
  VerifyEmailDto,
} from "@/features/auth/interfaces/auth.interfaces";

// Errors are normalized to ApiError (human-readable message + code) by the axios response interceptor,
// so these plain functions just return `response.data`.

export const getMe = async (): Promise<Me> => {
  const response = await axiosInstance.get<Me>(ApiRoutes.auth.me);
  return response.data;
};

export const login = async (dto: LoginDto): Promise<Me> => {
  const response = await axiosInstance.post<AuthUserResponse>(ApiRoutes.auth.login, dto);
  return response.data.user;
};

export const register = async (dto: RegisterDto): Promise<MessageResponse> => {
  const response = await axiosInstance.post<MessageResponse>(ApiRoutes.auth.register, dto);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await axiosInstance.post(ApiRoutes.auth.logout);
};

export const verifyEmail = async (dto: VerifyEmailDto): Promise<MessageResponse> => {
  const response = await axiosInstance.post<MessageResponse>(ApiRoutes.auth.verifyEmail, dto);
  return response.data;
};

export const resendVerification = async (): Promise<MessageResponse> => {
  const response = await axiosInstance.post<MessageResponse>(ApiRoutes.auth.resendVerification);
  return response.data;
};

export const forgotPassword = async (dto: ForgotPasswordDto): Promise<MessageResponse> => {
  const response = await axiosInstance.post<MessageResponse>(ApiRoutes.auth.forgotPassword, dto);
  return response.data;
};

export const resetPassword = async (dto: ResetPasswordDto): Promise<MessageResponse> => {
  const response = await axiosInstance.post<MessageResponse>(ApiRoutes.auth.resetPassword, dto);
  return response.data;
};
