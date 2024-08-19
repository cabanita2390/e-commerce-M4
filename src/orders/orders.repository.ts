import { Injectable, NotFoundException } from '@nestjs/common';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetails } from 'src/entities/orderDetails.entity';
import { Orders } from 'src/entities/orders.entity';
import { Products } from 'src/entities/products.entity';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Orders)
    private readonly ordersRepository: Repository<Orders>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(OrderDetails)
    private readonly orderDetailsRepository: Repository<OrderDetails>,
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async addOrder(userId: string, products: any) {
    let total = 0;

    // Verificamos que el usuario exista
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`Usuario con id: ${userId} no encontrado`);
    }

    const order = new Orders();
    order.date = new Date();
    order.user = user;

    const newOrder = await this.ordersRepository.save(order);

    // Asociamos cada 'id' con el 'producto'
    const productsArray = await Promise.all(
      products.map(async (element) => {
        const product = await this.productsRepository.findOneBy({
          id: element.id,
        });
        if (!product) {
          throw new NotFoundException('Producto no encontrado');
        }
        // Calculamos el monto total:
        total += Number(product.price);
        // Actualizamos el stock:
        await this.productsRepository.update(
          { id: element.id },
          { stock: product.stock - 1 },
        );

        return product;
      }),
    );

    // Creamos "OrderDetail" y la insertamos en BBDD:
    const orderDetail = new OrderDetails();
    orderDetail.price = Number(total.toFixed(2));
    orderDetail.products = productsArray;
    orderDetail.orders = newOrder;

    const savedOrderDetail =
      await this.orderDetailsRepository.save(orderDetail);

    // Actualizamos la orden con el detalle de la orden
    newOrder.orderDetails = savedOrderDetail;
    await this.ordersRepository.save(newOrder);

    // Enviamos al cliente la compra con la info de productos:
    return await this.ordersRepository.find({
      where: { id: newOrder.id },
      relations: { orderDetails: true },
    });
  }

  async getOrder(id: string) {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: {
        orderDetails: {
          products: true,
        },
      },
    });

    if (!order) {
      throw new NotFoundException('Orden no encontrada');
    }

    return order;
  }
}
