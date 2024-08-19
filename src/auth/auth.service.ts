import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Users } from 'src/entities/users.entity';
import { UsersRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  getAuth() {
    return 'Autenticacion';
  }

  async signin(email, password) {
    if (!email || !password)
      throw new BadRequestException('Debe ingresar usuario y contraseña');

    const userFound = await this.usersRepository.getUserByEmail(email);
    if (!userFound) {
      throw new BadRequestException('Credenciales incorrectas1');
    }

    // Validamos password con bCrypt
    const validPassword = await bcrypt.compare(password, userFound.password);
    if (!validPassword) {
      throw new BadRequestException('Credenciales incorrectas2');
    }

    // Como todo salió bien, creamos el payload
    const payload = {
      id: userFound.id,
      email: userFound.email,
      isAdmin: userFound.isAdmin,
    };

    // Como todo salió bien, vamos a firmar(generar) el Token
    const token = this.jwtService.sign(payload);

    return {
      message: 'Usuario validado',
      token,
    };
  }

  async signUp(user: Partial<Users>) {
    const { email, password } = user;

    // 1. verificar que el usuario no se encuentre registrado
    const foundUser = await this.usersRepository.getUserByEmail(email);
    if (foundUser) throw new BadRequestException('Usuario ya registrado');

    // 2. Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Crear usuario en BDD

    return await this.usersRepository.signUp({
      ...user,
      password: hashedPassword,
    });
  }
}
