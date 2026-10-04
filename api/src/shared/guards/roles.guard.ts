import { Injectable, CanActivate, ExecutionContext, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { AuthRole } from 'generated/prisma';
import { ApiException } from '../errors/api-exception';
import { ErrorCodes } from '../config/error-codes';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const user = context.switchToHttp().getRequest().user;
    const allowed =
      !!user?.role && (user.role === AuthRole.SUPER_ADMIN || requiredRoles.includes(user.role));

    if (!allowed) {
      throw new ApiException(HttpStatus.FORBIDDEN, ErrorCodes.FORBIDDEN, 'Insufficient permissions');
    }
    return true;
  }
}
