export default () => ({
  database: getDatabaseProps(),
  jwt: getJwtProps(),
  mail: getMailProps(),
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

const getJwtProps = () => ({
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN,
});

const getMailProps = () => ({
  mailHost: process.env.MAIL_HOST,
  mailSecure: process.env.MAIL_SECURE,
  mailPort: process.env.MAIL_PORT,
  defaultMailUser: process.env.DEFAULT_MAIL_USER,
  defaultMailPassword: process.env.DEFAULT_MAIL_PASSWORD,
  defaultMailFrom: process.env.DEFAULT_MAIL_FROM,
  defaultReplyTo: process.env.DEFAULT_REPLY_TO,
});
