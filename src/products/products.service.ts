import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  // Product,
  // ProductModificate,
  ProductsRepository,
} from './products.repository';
import { UpdateProductDto } from './products.dto';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class ProductsService implements OnModuleInit {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly categoriesService: CategoriesService,
  ) {}

  async onModuleInit() {
    await this.categoriesService.seedCategories();
    await this.seedProducts();
  }

  addProducts() {
    return this.productsRepository.addProducts();
  }

  async seedProducts() {
    await this.addProducts();
  }

  getProducts(page: string, limit: string) {
    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const products = this.productsRepository.getProducts(
      pageNumber,
      limitNumber,
    );
    return products;
  }

  getProductByID(id: string) {
    const product = this.productsRepository.getProductByID(id);

    return product;
  }

  /*
  createProduct(product: Product) {
    const newProduct = this.productsRepository.createProduct(product);
    return newProduct;
  }
*/
  updateProduct(dataProduct: UpdateProductDto, id: string) {
    const updatedProduct = this.productsRepository.updateProduct(
      dataProduct,
      id,
    );
    return updatedProduct;
  }

  // deleteProdut(id: string) {
  //   const deletedProdut = this.productsRepository.deleteProdut(id);
  //   return deletedProdut;
  // }
}
