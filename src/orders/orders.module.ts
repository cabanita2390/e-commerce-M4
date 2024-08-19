import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersRepository } from './orders.repository';
import { Orders } from 'src/entities/orders.entity';
import { Users } from 'src/entities/users.entity';
import { OrderDetails } from 'src/entities/orderDetails.entity';
import { Products } from 'src/entities/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Orders, Users, OrderDetails, Products])],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}

