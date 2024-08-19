import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Products } from './products.entity';
import { Orders } from './orders.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'ORDERDETAILS',
})
export class OrderDetails {
  @ApiProperty({
    description: 'uuid generado automáticamente por la BBDD',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Debe ser un número. Puede ser decimal',
    example: 89.99,
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  // Relación 1:1 con orders
  @OneToOne(() => Orders, (order) => order.orderDetails)
  @JoinColumn({ name: 'order_id' })
  orders: Orders;

  // Relación N:N con products
  @ManyToMany(() => Products, (product) => product.orderDetails)
  @JoinTable({
    name: 'ORDERDETAILS_PRODUCTS',
    joinColumn: {
      name: 'orderdetail_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
  })
  products: Products[];
}
