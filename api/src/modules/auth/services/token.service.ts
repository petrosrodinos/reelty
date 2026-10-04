import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createHash, randomBytes } from 'crypto';
import { AuthTtl } from '@/shared/constants/auth.constants';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  signAccessToken(user: { id: string; role: string }): Promise<string> {
    return this.jwtService.signAsync(
      { sub: user.id, role: user.role },
      { expiresIn: AuthTtl.ACCESS_SECONDS },
    );
  }

  /** Opaque random token (base64url). Only its sha256 is ever stored. */
  generateOpaqueToken(bytes = 48): string {
    return randomBytes(bytes).toString('base64url');
  }

  generateCsrfToken(): string {
    return randomBytes(32).toString('base64url');
  }

  hash(value: string): string {
    return createHash('sha256').update(value).digest('hex');
  }
}
