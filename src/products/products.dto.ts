import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateProductDto {
  @ApiHideProperty()
  id: string;

  @ApiProperty({
    description: 'Debe ingresar el nombre del producto. Máximo 50 caracteres.',
    example: 'iPhone 15 Pro Max',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  name: string;

  @ApiProperty({
    description: 'Debe ingresar descripción del producto.',
    example:
      'iPhone 15 Pro Max. Forjado en titanio y equipado con el revolucionario chip A17 Pro, un Botón de Acción personalizable y el sistema de cámaras más potente en un iPhone.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  description: string;

  @ApiProperty({
    description: 'Debe ser un número. Puede ser decimal',
    example: 449.99,
  })
  @IsOptional()
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Stock del producto',
  })
  @IsOptional()
  @IsNumber()
  stock: number;

  @ApiProperty({
    description: 'Url de imagen del producto',
    example:
      'https://exitocol.vtexassets.com/arquivos/ids/21137336/iphone-15-pro-max-256-gb-titanio-negro-nuevo-1028539720.jpg?v=638415833815770000',
  })
  @IsOptional()
  @IsString()
  imgUrl: string;
}
