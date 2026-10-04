import { CanActivate, ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthCookies } from '../constants/auth.constants';
import { ApiException } from '../errors/api-exception';
import { ErrorCodes } from '../config/error-codes';

export interface AccessTokenPayload {
  sub: string;
  role: string;
}

/**
 * Reads the access JWT from the `reelty_at` cookie (or `Authorization: Bearer` for tooling)
 * and attaches `request.user = { id, role }`.
 */
@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);

    if (!token) {
      throw new ApiException(HttpStatus.UNAUTHORIZED, ErrorCodes.UNAUTHORIZED, 'Authentication required');
    }

    try {
      const payload = await this.jwtService.verifyAsync<AccessTokenPayload>(token, {
        algorithms: ['HS256'],
      });
      if (!payload?.sub) throw new Error('missing subject');
      request.user = { id: payload.sub, role: payload.role };
      return true;
    } catch {
      throw new ApiException(HttpStatus.UNAUTHORIZED, ErrorCodes.UNAUTHORIZED, 'Invalid or expired session');
    }
  }

  private extractToken(request: any): string | null {
    const cookie = request.cookies?.[AuthCookies.ACCESS];
    if (typeof cookie === 'string' && cookie) return cookie;

    const header = request.headers?.authorization;
    if (typeof header === 'string' && header.startsWith('Bearer ')) {
      return header.slice(7).trim() || null;
    }
    return null;
  }
}
