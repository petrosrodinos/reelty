import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ClientIp = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return (request.ip as string | undefined) ?? null;
});

export const UserAgent = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const ua = request.headers?.['user-agent'] as string | undefined;
  return ua ? ua.slice(0, 255) : null;
});
