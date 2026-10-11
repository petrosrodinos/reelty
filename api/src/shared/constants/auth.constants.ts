/**
 * Optional env prefix (e.g. `stg_`) so environments sharing a parent COOKIE_DOMAIN do not read each other's cookies.
 * Read from process.env at import time, so set it as a real environment variable (not only in an .env file).
 * Must match NEXT_PUBLIC_COOKIE_PREFIX in the app.
 */
const COOKIE_PREFIX = process.env.COOKIE_PREFIX ?? '';

export const AuthCookies = {
  ACCESS: `${COOKIE_PREFIX}reelty_at`,
  REFRESH: `${COOKIE_PREFIX}reelty_rt`,
  CSRF: `${COOKIE_PREFIX}reelty_csrf`,
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
