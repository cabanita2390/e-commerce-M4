import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/entities/categories.entity';
import { Products } from 'src/entities/products.entity';
import { Repository } from 'typeorm';
import * as data from '../utils/data.json';
import { UpdateProductDto } from './products.dto';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
  ) {}

  async getProducts(page: number, limit: number) {
    if (!page) page = 1;
    if (!limit) limit = 5;

    let products = await this.productsRepository.find({
      relations: {
        category: true,
      },
    });
    const start = (page - 1) * limit;
    const end = start + limit;
    products = products.slice(start, end);

    return products;
  }

  async getProductByID(id: string) {
    const product = await this.productsRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }
    return product;
  }

  async addProducts() {
    const categories = await this.categoriesRepository.find();
    if (!categories || categories.length === 0) {
      throw new NotFoundException('No existe la categoría');
    }

    const savedProducts = await Promise.all(
      data.map(async (product) => {
        const category = categories.find(
          (cat) => cat.name === product.category,
        );

        if (!category) {
          throw new Error(`La categoría ${product.category} no existe`);
        }

        // Verifica si el producto ya existe
        const existingProduct = await this.productsRepository.findOne({
          where: { name: product.name },
        });
        if (existingProduct) return existingProduct;

        const newProduct = this.productsRepository.create({
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          category: category,
          imgUrl: product.imgUrl,
        });

        await this.productsRepository.save(newProduct);
        return newProduct;
      }),
    );

    const productList = savedProducts.map((product) => ({
      id: product.id,
      name: product.name,
    }));

    return productList;
  }

  async updateProduct(product: UpdateProductDto, id: string) {
    //validar si el producto existe
    const productFound = await this.productsRepository.findOneBy({ id });

    if (!productFound) throw new BadRequestException('Producto no existe');

    await this.productsRepository.update(id, product);

    const updatedProduct = await this.productsRepository.findOneBy({ id });

    return updatedProduct;
  }

  /*
  async createProduct(product: Product) {
    products.push(product);

    const productId = product.id;
    return productId;
  }


  async deleteProdut(id: string) {
    const productIndexFound = products.findIndex(
      (product) => product.id === id,
    );
    if (productIndexFound === -1) return 'Usuario no encontrado';

    products.splice(productIndexFound, 1);

    return id;
  }
    */
}
