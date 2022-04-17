import { ConfigService } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export default async function (
  configService: ConfigService,
): Promise<PostgresConnectionOptions> {
  const {
    type,
    host,
    port,
    username,
    database,
    password,
    entities,
    migrationsRun,
    migrations,
  } = configService.get('database');

  let extra = {
    ssl: {
      rejectUnauthorized: false,
      require: true,
    },
  };

  if (process.env.NODE_ENV === 'local') {
    extra = null;
  }

  return {
    type,
    host,
    port,
    username,
    password,
    database,
    synchronize: false,
    migrationsRun,
    // migrations: [migrations],
    entities: [entities],
    logging: true,
    extra,
  };
}
