import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerGlobalMiddleware } from './middlewares/Logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CategoriesService } from './categories/categories.service';
import { ProductsService } from './products/products.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const categoriesService = app.get(CategoriesService);
  await categoriesService.seedCategories();

  const productsService = app.get(ProductsService);
  await productsService.seedProducts();

  // Configuracion de swagger
  const options = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('Proyecto integrador M4 Backend FT-50')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);

  // app.use(LoggerGlobalMiddleware);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
