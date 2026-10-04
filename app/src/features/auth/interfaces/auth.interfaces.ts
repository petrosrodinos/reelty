export const UserRoles = {
  USER: "USER",
  ADMIN: "ADMIN",
} as const;
export type UserRole = (typeof UserRoles)[keyof typeof UserRoles];

export interface Quota {
  used: number;
  limit: number;
  remaining: number;
  resets_at: string;
}

export interface Me {
  id: string;
  email: string;
  role: UserRole;
  email_verified: boolean;
  created_at: string;
  quota: Quota;
}

export interface AuthUserResponse {
  user: Me;
}

export interface MessageResponse {
  message: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  token: string;
  password: string;
}

export interface VerifyEmailDto {
  token: string;
}
