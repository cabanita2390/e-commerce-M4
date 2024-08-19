import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Products } from './products.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'CATEGORIES',
})
export class Categories {
  @ApiProperty({
    description: 'uuid generado automáticamente por la BBDD',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Debe ingresar el nombre del producto. Máximo 50 caracteres.',
    example: 'iPhone 15 Pro Max',
  })
  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  name: string;

  //Acá van las relaciones:

  // Relación 1:N con products
  @OneToMany(() => Products, (product) => product.category)
  products: Products[];
}
