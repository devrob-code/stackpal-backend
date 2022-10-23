// import { ConfigService } from '@nestjs/config';
// import { ConnectionOptions } from 'typeorm';

// //config is used for creating new migration with empty up and down methods
// const configService = new ConfigService();
// const config: ConnectionOptions = {
//   type: 'postgres',
//   host: configService.get('DB_HOST'),
//   port: configService.get('DB_PORT'),
//   username: configService.get('DB_USERNAME'),
//   password: configService.get('DB_PASSWORD'),
//   database: configService.get('DB_NAME'),
//   entities: [`${__dirname}/**/*.entity{.ts,.js}`],
//   synchronize: false,
//   logging: true,
//   logger: 'file',
//   migrationsRun: true,
//   migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
//   cli: {
//     migrationsDir: 'src/migrations',
//   },
// };

// export = config;
