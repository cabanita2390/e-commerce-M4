import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './users.entity';
import { OrderDetails } from './orderDetails.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'ORDERS',
})
export class Orders {
  @ApiProperty({
    description: 'uuid v4 generado automáticamente por la BBDD',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Debe ingresar una fecha: dd/mm/aaaa',
    example: '07/07/2024',
  })
  @Column()
  date: Date;

  // Relación 1:N con users
  @ManyToOne(() => Users, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  // Relación 1:1 con orderDetails
  @OneToOne(() => OrderDetails, (orderDetail) => orderDetail.orders)
  @JoinColumn({ name: 'orderDetails_id' }) // Asegúrate de que el nombre de la columna es correcto
  orderDetails: OrderDetails;
}
