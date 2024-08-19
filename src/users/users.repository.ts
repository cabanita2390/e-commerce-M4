import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { updateUserDto } from './users.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';

export class UsersRepository {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async getUsers(page: number, limit: number) {
    if (!page) page = 1;
    if (!limit) limit = 5;

    const skip = (page - 1) * limit;

    const users = await this.usersRepository.find({
      take: limit,
      skip: skip,
    });

    return users.map(({ password, ...userNoPassword }) => userNoPassword);
  }

  async getUserById(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: { orders: true },
    });

    // Validar si el usuario no existe
    if (!user) {
      throw new NotFoundException('No se encontró el usuario');
    }

    const { password, ...userNoPassword } = user;
    return userNoPassword;
  }

  async signUp(user: Partial<Users>) {
    const newUser = await this.usersRepository.save(user);

    const dbUser = await this.usersRepository.findOneBy({
      id: newUser.id,
    });

    const { password, ...userNoPassword } = dbUser;
    return userNoPassword;
  }

  async updateUser(dataUser: updateUserDto, id: string) {
    // Validar si el usuario no existe
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('No se encontró el usuario');
    }

    // Validar si no hay datos para actualizar
    if (!dataUser || Object.keys(dataUser).length === 0) {
      throw new BadRequestException('No hay campos válidos para actualizar');
    }

    await this.usersRepository.update(id, dataUser);
    const updatedUser = await this.usersRepository.findOneBy({ id });

    const { password, ...userNoPassword } = updatedUser;
    return userNoPassword;
  }

  async deleteUser(id: string) {
    const user = await this.usersRepository.findOneBy({ id });

    // Validar si el usuario no existe
    if (!user) {
      throw new NotFoundException('No se encontró el usuario');
    }

    await this.usersRepository.remove(user);
    const { password, ...userNoPassword } = user;
    return userNoPassword;
  }

  async getUserByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }
}
