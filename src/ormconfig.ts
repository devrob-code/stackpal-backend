import { ConfigService } from '@nestjs/config';
import { ConnectionOptions, DataSource, DataSourceOptions } from 'typeorm';

//config is used for creating new migration with empty up and down methods
const configService = new ConfigService();
const config = new DataSource({
  type: 'postgres',
  host: 'localhossdsdsdsdt',
  port: 5432,
  username: 'postgresq',
  password: '1234dsdsdsd56',
  database: 'crypsdsdsdsdtokn',
  synchronize: false,
  logging: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  //entities: [`${__dirname}/**/*.entity{.ts,.js}`],
  subscribers: [],
  //migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
  migrations: ['dist/migrations/*{.ts,.js}'],
  migrationsRun: true,
});

export default config;
