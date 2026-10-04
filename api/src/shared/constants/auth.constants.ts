export const AuthCookies = {
  ACCESS: 'reelty_at',
  REFRESH: 'reelty_rt',
  CSRF: 'reelty_csrf',
} as const;

export const CSRF_HEADER = 'x-csrf-token';
export const REQUESTED_WITH_HEADER = 'x-requested-with';
export const REQUESTED_WITH_VALUE = 'reelty';

export const AuthTtl = {
  ACCESS_SECONDS: 15 * 60,
  REFRESH_SECONDS: 30 * 24 * 60 * 60,
  EMAIL_VERIFICATION_SECONDS: 24 * 60 * 60,
  PASSWORD_RESET_SECONDS: 60 * 60,
} as const;

export const REFRESH_COOKIE_PATH = '/api/auth';
