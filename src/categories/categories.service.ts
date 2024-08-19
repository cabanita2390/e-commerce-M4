import { Injectable, OnModuleInit } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService implements OnModuleInit {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async onModuleInit() {
    await this.seedCategories();
  }

  async seedCategories() {
    await this.categoriesRepository.addCategories();
  }

  // addCategories() {
  //   return this.categoriesRepository.addCategories();
  // }

  getCategories() {
    return this.categoriesRepository.getCategories();
  }
}
