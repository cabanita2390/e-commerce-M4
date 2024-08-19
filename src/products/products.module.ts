import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/entities/products.entity';
import { Categories } from 'src/entities/categories.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { CategoriesRepository } from 'src/categories/categories.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Products, Categories])],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ProductsRepository,
    CategoriesService,
    CategoriesRepository,
  ],
})
export class ProductsModule {}
