export const UserRoles = {
  USER: "USER",
  ADMIN: "ADMIN",
  SUPER_ADMIN: "SUPER_ADMIN",
  SUPPORT: "SUPPORT",
} as const;
export type UserRole = (typeof UserRoles)[keyof typeof UserRoles];

/** Roles the API admin endpoints accept (ADMIN, plus SUPER_ADMIN which bypasses role checks). */
export const isAdminRole = (role: UserRole | undefined): boolean =>
  role === UserRoles.ADMIN || role === UserRoles.SUPER_ADMIN;

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
