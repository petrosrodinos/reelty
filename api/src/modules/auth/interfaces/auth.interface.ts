
export interface Me {
  id: string;
  email: string;
  full_name: string | null;
  role: string;
  email_verified: boolean;
  created_at: string;
  credits: { balance: number };
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
