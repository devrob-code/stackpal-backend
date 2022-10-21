import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  synchronize: true,
  logging: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  //entities: [`${__dirname}/**/*.entity{.ts,.js}`],
  subscribers: [],
  //migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
  migrations: ['dist/migrations/*{.ts,.js}'],
  migrationsRun: true,
});

export default AppDataSource;
