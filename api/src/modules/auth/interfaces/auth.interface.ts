import type { Quota } from '@/modules/usage/interfaces/usage.interface';

export interface Me {
  id: string;
  email: string;
  role: string;
  email_verified: boolean;
  created_at: string;
  quota: Quota;
}

export interface SessionTokens {
  accessToken: string;
  refreshToken: string;
  csrfToken: string;
}

export interface RequestContext {
  ip: string | null;
  userAgent: string | null;
}
