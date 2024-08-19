import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { updateUserDto } from './users.dto';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from './roles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  //*GET /users
  @ApiBearerAuth()
  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getUsers(@Query('page') page: string, @Query('limit') limit: string) {
    return this.usersService.getUsers(page, limit);
  }

  @ApiBearerAuth()
  @Get('/:id')
  @UseGuards(AuthGuard)
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    const user = this.usersService.getUserById(id);
    return user;
  }

  @ApiBearerAuth()
  @Put('/:id')
  @UseGuards(AuthGuard)
  async updateUser(@Body() dataUser: updateUserDto, @Param('id') id: string) {
    try {
      return await this.usersService.updateUser(dataUser, id);
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException('Error al actualizar el usuario');
    }
  }

  @ApiBearerAuth()
  @Delete('/:id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    const deletedUser = this.usersService.deleteUser(id);
    return deletedUser;
  }
}
