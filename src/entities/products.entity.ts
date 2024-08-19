import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Categories } from './categories.entity';
import { OrderDetails } from './orderDetails.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'PRODUCTS',
})
export class Products {
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

  @ApiProperty({
    description: 'Debe ingresar descripción del producto.',
    example:
      'iPhone 15 Pro Max. Forjado en titanio y equipado con el revolucionario chip A17 Pro, un Botón de Acción personalizable y el sistema de cámaras más potente en un iPhone.',
  })
  @Column({ type: 'text', nullable: false })
  description: string;

  @ApiProperty({
    description: 'Debe ser un número. Puede ser decimal',
    example: 449.99,
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'int', nullable: false })
  stock: number;

  @ApiProperty({
    description: 'Url de imagen del producto',
    example:
      'https://exitocol.vtexassets.com/arquivos/ids/21137336/iphone-15-pro-max-256-gb-titanio-negro-nuevo-1028539720.jpg?v=638415833815770000',
  })
  @Column({ type: 'text', default: 'default-image-url.jpg' })
  imgUrl: string;

  //Acá van las relaciones:
  //category_id: Relación 1:N
  @ManyToOne(() => Categories, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Categories;

  // Relación N:N con orderDetails
  @ManyToMany(() => OrderDetails, (orderDetail) => orderDetail.products)
  orderDetails: OrderDetails[];
}
