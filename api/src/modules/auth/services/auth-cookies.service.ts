import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { CookieOptions, Response } from 'express';
import { AuthCookies, AuthTtl, REFRESH_COOKIE_PATH } from '@/shared/constants/auth.constants';
import type { SessionTokens } from '../interfaces/auth.interface';

@Injectable()
export class AuthCookiesService {
  constructor(private readonly config: ConfigService) {}

  private base(httpOnly: boolean, path: string): CookieOptions {
    const domain = this.config.get<string>('COOKIE_DOMAIN');
    return {
      httpOnly,
      sameSite: 'lax',
      secure: this.config.get<string>('NODE_ENV') === 'production',
      path,
      ...(domain ? { domain } : {}),
    };
  }

  setSession(res: Response, tokens: SessionTokens) {
    res.cookie(AuthCookies.ACCESS, tokens.accessToken, {
      ...this.base(true, '/'),
      maxAge: AuthTtl.ACCESS_SECONDS * 1000,
    });
    res.cookie(AuthCookies.REFRESH, tokens.refreshToken, {
      ...this.base(true, REFRESH_COOKIE_PATH),
      maxAge: AuthTtl.REFRESH_SECONDS * 1000,
    });
    res.cookie(AuthCookies.CSRF, tokens.csrfToken, {
      ...this.base(false, '/'),
      maxAge: AuthTtl.REFRESH_SECONDS * 1000,
    });
  }

  clearSession(res: Response) {
    res.clearCookie(AuthCookies.ACCESS, this.base(true, '/'));
    res.clearCookie(AuthCookies.REFRESH, this.base(true, REFRESH_COOKIE_PATH));
    res.clearCookie(AuthCookies.CSRF, this.base(false, '/'));
  }
}
