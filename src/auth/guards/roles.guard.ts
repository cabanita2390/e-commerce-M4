import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from 'src/users/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log('En roles.guard, requiredRoles: ', requiredRoles);
    // requiedRoles = ['admin]

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('En roles.guard, user', user);
    // user = {id, email,name, isAdmin, exp, iat}

    function hasRequiredRole(userRoles: Role[], requiredRoles: Role[]) {
      if (
        !requiredRoles ||
        requiredRoles.length === 0 ||
        !userRoles ||
        userRoles.length === 0
      ) {
        return false; // Retorna false si no hay roles requeridos o si está vacío
      }

      for (let i = 0; i < requiredRoles.length; i++) {
        const requiredRole = requiredRoles[i];
        for (let j = 0; j < userRoles.length; j++) {
          const userRole = userRoles[j];
          if (userRole === requiredRole) {
            return true;
          }
        }
      }
      return false;
    }

    console.log(
      'En roles.guard, hasRole: ',
      hasRequiredRole(user?.roles, requiredRoles),
    );
    const valid =
      user && user.roles && hasRequiredRole(user.roles, requiredRoles);

    if (!valid) {
      throw new ForbiddenException(
        'No tiene permisos para acceder a esta ruta',
      );
    }

    return true;
  }
}
