import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { Products } from 'src/entities/products.entity';

export class CreateOrderDto {
  @ApiProperty({
    description: 'uuid generado automáticamente por la BBDD',
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsArray()
  @ArrayMinSize(1)
  products: Partial<Products[]>;
}
