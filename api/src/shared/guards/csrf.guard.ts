import { CanActivate, ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { timingSafeEqual } from 'crypto';
import {
  AuthCookies,
  CSRF_HEADER,
  REQUESTED_WITH_HEADER,
  REQUESTED_WITH_VALUE,
} from '../constants/auth.constants';
import { SESSIONLESS_KEY } from '../decorators/sessionless.decorator';
import { ApiException } from '../errors/api-exception';
import { ErrorCodes } from '../config/error-codes';
import { getAllowedOrigins } from '../config/cors';

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

const safeEqual = (a: string, b: string) => {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
};

/**
 * Global CSRF protection (contract section 2).
 *  - Session-less auth endpoints (@SessionlessAuth): `X-Requested-With: reelty` and,
 *    when present, an Origin/Referer in the CORS allow-list.
 *  - Everything else: when the request is cookie-authenticated, the `X-CSRF-Token`
 *    header must equal the `reelty_csrf` cookie (double submit).
 *  Requests with no auth cookies at all (e.g. Bearer tooling, anonymous) skip the
 *  double-submit check; JwtGuard then rejects them with 401 if they are not allowed.
 */
@Injectable()
export class CsrfGuard implements CanActivate {
  private readonly allowedOrigins: string[];

  constructor(
    private readonly reflector: Reflector,
    configService: ConfigService,
  ) {
    this.allowedOrigins = getAllowedOrigins(configService);
  }

  canActivate(context: ExecutionContext): boolean {
    if (context.getType() !== 'http') return true;

    const request = context.switchToHttp().getRequest();
    if (SAFE_METHODS.has(String(request.method).toUpperCase())) return true;

    const sessionless = this.reflector.getAllAndOverride<boolean>(SESSIONLESS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (sessionless) {
      const requestedWith = request.headers[REQUESTED_WITH_HEADER];
      if (requestedWith !== REQUESTED_WITH_VALUE || !this.originAllowed(request)) {
        this.fail();
      }
      return true;
    }

    const cookies = request.cookies ?? {};
    const cookieAuthenticated = !!(cookies[AuthCookies.ACCESS] || cookies[AuthCookies.REFRESH]);
    if (!cookieAuthenticated) return true;

    const cookieToken = cookies[AuthCookies.CSRF];
    const headerToken = request.headers[CSRF_HEADER];
    if (
      typeof cookieToken !== 'string' ||
      typeof headerToken !== 'string' ||
      !cookieToken ||
      !safeEqual(cookieToken, headerToken)
    ) {
      this.fail();
    }
    return true;
  }

  private originAllowed(request: any): boolean {
    const origin = request.headers.origin;
    if (typeof origin === 'string' && origin) {
      return this.allowedOrigins.includes(origin);
    }
    const referer = request.headers.referer;
    if (typeof referer === 'string' && referer) {
      try {
        return this.allowedOrigins.includes(new URL(referer).origin);
      } catch {
        return false;
      }
    }
    return true;
  }

  private fail(): never {
    throw new ApiException(HttpStatus.FORBIDDEN, ErrorCodes.CSRF_FAILED, 'CSRF validation failed');
  }
}
