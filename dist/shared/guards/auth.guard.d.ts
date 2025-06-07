import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { UsersService } from 'src/users/users.service';
export declare class AuthGuard implements CanActivate {
    private jwtService;
    private userService;
    private reflector;
    constructor(jwtService: JwtService, userService: UsersService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
