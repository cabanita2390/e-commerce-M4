import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Role } from 'src/users/roles.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //Trae el contexto de ejecución
    const request = context.switchToHttp().getRequest();

    //Extraer el token desde headers:
    // Authorization -->  Bearer: TOKEN

    const token = request.headers.authorization?.split(' ')[1];

    if (!token) throw new UnauthorizedException('Token requerido');

    try {
      //*Hacemos la validación
      const secretWord = process.env.JWT_SECRET;
      const user = this.jwtService.verify(token, { secret: secretWord }); //* Acá llega el user payload {id: 'bc892a7a-e804-4a2f-a8d7-29a8e949a788', email: 'prueba4@mail.co', name: 'Prueba4', iat: 1720110926, exp: 1720114526}
      if (!user) throw new BadRequestException('Token requerido');

      //* Adjuntar fecha de expiración.
      user.exp = new Date(user.exp * 1000);

      user.roles = user.isAdmin ? [Role.Admin] : [Role.User];

      request.user = user;

      return true;
    } catch (error) {
      throw new UnauthorizedException('Token no válido');
    }
  }
}
