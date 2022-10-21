import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

const configService = new ConfigService();
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  //entities: [`${__dirname}/**/*.entity{.ts,.js}`],
  subscribers: [],
  //migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
  migrations: ['dist/migrations/*{.ts,.js}'],
  migrationsRun: true,
});
