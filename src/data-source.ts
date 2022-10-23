import { DataSource } from 'typeorm';
const dotenv = require('dotenv');
dotenv.config();

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
  migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
  migrationsRun: true,
  //   extra: {
  //     ssl: {
  //       rejectUnauthorized: false,
  //     },
  //   },
});

AppDataSource.initialize()
  .then(() => {
    let database = process.env.DB_PORT;
    console.log(`Data Source has been initialized ${database} `);
  })
  .catch((err) => {
    let database = process.env.DB_NAME;
    console.log({ database });
    console.error(`Data Source initialization error`, err);
  });

export default AppDataSource;
