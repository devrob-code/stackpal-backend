export default () => ({
  database: getDatabaseProps(),
  jwt: getJwtProps(),
  mail: getMailProps(),
  encrypt: getEncryptProps(),
  twilio: getTwilioProps(),
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
  expiresIn: process.env.JWT_EXPIRES_IN.toString(),
});

const getMailProps = () => ({
  mailHost: process.env.MAIL_HOST,
  mailSecure: process.env.MAIL_SECURE,
  mailPort: process.env.MAIL_PORT,
  defaultMailUser: process.env.DEFAULT_MAIL_USER,
  defaultMailPassword: process.env.DEFAULT_MAIL_PASSWORD,
  defaultMailFrom: process.env.DEFAULT_MAIL_FROM,
  defaultReplyTo: process.env.DEFAULT_REPLY_TO,
  accountEmail: process.env.ACCOUNT_EMAIL,
  accountPassword: process.env.ACCOUNT_PASSWORD,
});

const getEncryptProps = () => ({
  encryptPassword: process.env.ENCRYPT_PASSWORD,
});

const getTwilioProps = () => ({
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
  twilioNumber: process.env.TWILIO_NUMBER,
});
