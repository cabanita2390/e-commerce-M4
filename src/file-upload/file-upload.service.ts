import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { ProductsRepository } from 'src/products/products.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/entities/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly fileUploadRepository: FileUploadRepository,
    // private readonly productsRepository: ProductsRepository,
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async uploadImage(file: Express.Multer.File, productId: string) {
    //*Primero validamos que el producto exista
    const productFound = await this.productsRepository.findOneBy({
      id: productId,
    });
    if (!productFound) throw new NotFoundException('Producto no encontrado');

    //*Como el producto sí existió, ahora sí cargo la imagen en Cloudinary
    const response = await this.fileUploadRepository.uploadImage(file);
    if (!response.secure_url) {
      throw new NotFoundException('Error al cargar imagen');
    }

    //Actualizamos imgUrl en la BBDD
    const secure_url = response.secure_url;
    //!Manejar el error
    await this.productsRepository.update(productId, {
      imgUrl: secure_url,
    });

    const productUpdate = await this.productsRepository.findOneBy({
      id: productId,
    });

    return productUpdate;
  }
}
