import { ApiHideProperty, PickType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { MatchPassword } from 'src/decorators/matchPassword.decorator';
import { Orders } from 'src/entities/orders.entity';

export class CreateUserDto {
  @ApiHideProperty()
  id: string;
  @ApiHideProperty()
  orders: Orders[];

  /**
   * Debe ser un string de entre 3 y 80 caracteres.
   * @example 'Tester User01'
   */

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  /**
   * Debe ser un string en formato email.
   * @example 'user01@mail.com'
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * Debe contener entre 8 y 15 caracteres. Debe incluir al menos una letra mayúscula, una minúscula, un número y  un carácter especial.
   * @example 'aaBB33##'
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
    message:
      'La contraseña debe contener al menos una letra minuscula, una mayuscula, un numero y un caracter especial',
  })
  password: string;

  /**
   * Debe coincidir con el password.
   * @example 'aaBB33##'
   */
  @IsNotEmpty()
  @Validate(MatchPassword, ['password'])
  confirmPassword: string;

  /**
   * Debe ser un string entre 3 y 80 caracteres.
   * @example 'Test street 1234'
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  /**
   * Debe ser un número.
   * @example 3052265478
   */
  @IsNotEmpty()
  @IsNumber()
  phone: number;

  /**
   * Debe ser un string entre 3 y 20 caracteres.
   * @example 'Test country'
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(4) //Perú
  @MaxLength(20)
  country: string;

  /**
   * Debe ser un string entre 5 y 20 caracteres.
   * @example 'Test city'
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(5) //Perú
  @MaxLength(20)
  city: string;
}

export class updateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
    message:
      'La contraseña debe contener al menos una letra minuscula, una mayuscula, un numero y un caracter especial',
  })
  password: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  @IsOptional()
  @IsNumber()
  phone: number;

  @IsOptional()
  @IsString()
  @MinLength(4) //Perú
  @MaxLength(20)
  country: string;

  @IsOptional()
  @IsString()
  @MinLength(5) //Perú
  @MaxLength(20)
  city: string;

  @IsEmpty()
  isAdmin?: boolean;
}

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}
