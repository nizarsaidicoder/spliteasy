import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { UserPayload } from '@app-types/user-payload.type';

export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext): UserPayload =>
{
  const request: Request = ctx.switchToHttp().getRequest();
  return request['user'] as UserPayload;
});
