import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Orders } from './orders.entity';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'USERS',
})
export class Users {
  @ApiProperty({
    description: 'uuid generado automáticamente por la BBDD',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Debe ingresar un nombre de máximo 50 caracteres',
    example: 'Homero',
  })
  @Column({ type: 'varchar', length: 80, nullable: false })
  name: string;

  @ApiProperty({
    description: 'Debe ser un string en formato email',
    example: 'homero@mail.com',
  })
  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  email: string;

  @ApiProperty({
    description:
      'Debe contener entre 8 y 15 caracteres. Debe incluir al menos una letra mayúscula, una minúscula, un número y un carácter especial.',
    example: 'aaBB33##',
  })
  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @ApiProperty({
    description: 'Debe ser un número',
    example: 3052265478,
  })
  @Column({ type: 'bigint' })
  phone: number;

  @ApiProperty({
    description: 'Debe ser un string entre 3 y 20 caracteres.',
    example: 'Test Country',
  })
  @Column({ type: 'varchar', length: 50 })
  country: string;

  @ApiProperty({
    description: 'Debe ser un string entre 3 y 80 caracteres.',
    example: 'Test Country',
  })
  @Column({ type: 'text' })
  address: string;

  @ApiProperty({
    description: 'Debe ser un string entre 3 y 80 caracteres.',
    example: 'Test City',
  })
  @Column({ length: 50 })
  city: string;

  @ApiHideProperty()
  @Column({ default: false })
  isAdmin: boolean;

  // Relación con orders
  @OneToMany(() => Orders, (order) => order.user)
  orders: Orders[];
}
