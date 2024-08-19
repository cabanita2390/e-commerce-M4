import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './products.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/users/roles.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
// import { Product, ProductModificate } from './products.repository';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('seeder')
  addProducts() {
    return this.productsService.addProducts();
  }

  @Get()
  getProducts(@Query('page') page: string, @Query('limit') limit: string) {
    return this.productsService.getProducts(page, limit);
  }

  @Get('/:id')
  getProductById(@Param('id', ParseUUIDPipe) id: string) {
    const product = this.productsService.getProductByID(id);
    return product;
  }

  // @Post()
  // createProduct(@Body() product: Product) {
  //   if (
  //     !product.id ||
  //     !product.name ||
  //     !product.description ||
  //     !product.price ||
  //     !product.stock ||
  //     !product.imgUrl
  //   )
  //     return 'Datos incompletos';
  //   const newProduct = this.productsService.createProduct(product);
  //   return newProduct;
  // }

  @ApiBearerAuth()
  @Put('/:id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  updateProduct(
    @Body() dataProduct: UpdateProductDto,
    @Param('id') id: string,
  ) {
    // Verificar si 'dataProduct' es nulo o está vacío
    if (!dataProduct || Object.keys(dataProduct).length === 0) {
      throw new BadRequestException(
        'Los datos de actualización son requeridos',
      );
    }

    const updatedProduct = this.productsService.updateProduct(dataProduct, id);
    return updatedProduct;
  }

  // @Delete('/:id')
  // deleteProdut(@Param('id') id: string) {
  //   const deletedProdut = this.productsService.deleteProdut(id);
  //   return deletedProdut;
  // }
}
