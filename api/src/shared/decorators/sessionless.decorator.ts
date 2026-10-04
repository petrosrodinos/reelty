import { SetMetadata } from '@nestjs/common';

export const SESSIONLESS_KEY = 'sessionless_auth';

/**
 * Marks auth endpoints that run without an established session (register, login,
 * refresh, ...). The CSRF guard then requires `X-Requested-With: reelty` plus an
 * allowed Origin/Referer instead of the double-submit token.
 */
export const SessionlessAuth = () => SetMetadata(SESSIONLESS_KEY, true);
