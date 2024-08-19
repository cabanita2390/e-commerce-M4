import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.development.env' });

const config = {
  type: 'postgres',
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as unknown as number,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  //Config extra
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  logging: false,
  synchronize: false,
  dropSchema: false,
};

export const typeOrmConfig = registerAs('typeorm', () => config); //Se declara en el app module, en imports, con ConfigModule
export const connectionSource = new DataSource(config as DataSourceOptions); //Se declara en el app module, en imports, con ConfigModule
