import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

const configService = new ConfigService();
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  synchronize: false,
  logging: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  //entities: [`${__dirname}/**/*.entity{.ts,.js}`],
  subscribers: [],
  //migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
  migrations: ['dist/migrations/*{.ts,.js}'],
  migrationsRun: true,
});
