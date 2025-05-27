import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { UserPayload } from '@app-types/user-payload.type';

@Injectable()
export class UserGuard implements CanActivate
{
  constructor(private reflector: Reflector)
  {}

  canActivate(context: ExecutionContext): boolean
  {
    const isCurrentUser = this.reflector.get<boolean>('isCurrentUser', context.getHandler());

    if (!isCurrentUser)
    {
      return true; // If the decorator isn't used, allow access
    }

    const request: Request = context.switchToHttp().getRequest();
    const user: UserPayload = request['user'] as UserPayload;
    const targetUserId: number = parseInt(request.params.id);

    if (!targetUserId)
    {
      throw new ForbiddenException('User ID not provided');
    }
    if (user.sub !== targetUserId)
    {
      throw new ForbiddenException('You do not have permission to access this resource');
    }

    return true;
  }
}
