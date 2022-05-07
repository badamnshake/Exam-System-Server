import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // it gets the execusion context and the roles from the decorator
    const requiredRoles = this.reflector.getAllAndOverride<Role>('role', [
      context.getHandler(),
      context.getClass(),
    ]);

    // if there are no roles defined, it returns true
    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();

    // return requiredRoles.some(role => user.roles.includes(role));
    if (user.role == requiredRoles) return true;
    else return false;
  }
}
