export default () => ({
  database: getDatabaseProps(),
});

const getDatabaseProps = () => {
  return {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    synchronize: process.env.DB_SYNCHRONIZE,
    entities: process.env.DB_ENTITIES_PATH,
    migrationsRun: process.env.DB_MIGRATIONS_RUN === 'true',
    migrations: process.env.DB_MIGRATIONS,
  };
};
