import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/auth/decorators/public.decorator';
import { UsersService } from 'src/users/users.service';
import { UserPayload } from '@app-types/user-payload.type';

@Injectable()
export class AuthGuard implements CanActivate
{
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
    private reflector: Reflector,
  )
  {}

  async canActivate(context: ExecutionContext): Promise<boolean>
  {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
    if (isPublic)
    {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    if (!token)
    {
      throw new UnauthorizedException('No token provided');
    }
    try
    {
      const payload: UserPayload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      const user = await this.userService.findOneById(payload.sub);
      if (!user)
      {
        throw new UnauthorizedException('User not found');
      }
      request['user'] = payload;
    }
    catch
    {
      throw new UnauthorizedException('Invalid token');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined
  {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
