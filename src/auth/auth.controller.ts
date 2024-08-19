import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from 'src/users/users.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAuth() {
    return this.authService.getAuth();
  }

  @Post('signup')
  @HttpCode(201)
  signUp(@Body() user: CreateUserDto) {
    const newUser = this.authService.signUp(user);

    return newUser;
  }

  @Post('signin')
  async signin(@Body() credentials: LoginUserDto) {
    const { email, password } = credentials;
    const signin = await this.authService.signin(email, password);

    return signin;
  }
}
