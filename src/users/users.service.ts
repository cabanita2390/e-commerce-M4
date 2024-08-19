import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { Users } from 'src/entities/users.entity';
import { updateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUsers(page: string, limit: string) {
    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const newUsers = await this.usersRepository.getUsers(
      pageNumber,
      limitNumber,
    );
    return newUsers;
  }

  async getUserById(id: string) {
    try {
      const user = await this.usersRepository.getUserById(id);
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('No se encontró el usuario');
      }
      throw error; // Deja que otras excepciones se propaguen para ser manejadas globalmente
    }
  }

  async updateUser(dataUser: updateUserDto, id: string) {
    try {
      const updatedUser = await this.usersRepository.updateUser(dataUser, id);
      return updatedUser;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('No se encontró el usuario');
      }
      throw error; // Deja que otras excepciones se propaguen para ser manejadas globalmente
    }
  }

  async deleteUser(id: string) {
    try {
      const deletedUser = await this.usersRepository.deleteUser(id);
      return deletedUser;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('No se encontró el usuario');
      }
      throw error; // Deja que otras excepciones se propaguen para ser manejadas globalmente
    }
  }
}
