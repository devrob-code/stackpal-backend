export default () => ({
  database: getDatabaseProps(),
  jwt: getJwtProps(),
  mail: getMailProps(),
  encrypt: getEncryptProps(),
  twilio: getTwilioProps(),
  coingecko: getCoinGeckoProps(),
  vtu: getVTUProps(),
  port: process.env.PORT || 5000,
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  environment: process.env.NODE_ENV,
  nownode: getNowNodeProps(),
  aws: getAWSProps(),
  okra: getOkraProps(),
  termii: getTermiiProps(),
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
    ssl: process.env.DB_SSL.toString() == 'true' ? true : false,
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

const getCoinGeckoProps = () => ({
  baseUrl: process.env.COINGECKO_BASE_URL, //api.coingecko.com/api/v3/coins
});

const getVTUProps = () => ({
  baseUrl: process.env.VTU_BASE_URL,
  apiKey: process.env.VTU_API_KEY,
  publicKey: process.env.VTU_PUBLIC_KEY,
  privateKey: process.env.VTU_PRIVATE_KEY,
});

const getNowNodeProps = () => ({
  apiKey: process.env.NOWNODE_API_KEY,
});

const getAWSProps = () => ({
  awsRegion: process.env.AWS_REGION,
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  awsBucketName: process.env.AWS_BUCKET_NAME,
  cloudfrontUrl: process.env.CLOUDFRONT_URL,
});

const getOkraProps = () => ({
  okraBaseUrl: process.env.OKRA_BASE_URL,
  okraSecretKey: process.env.OKRA_SECRET_KEY,
});

const getTermiiProps = () => ({
  termiiBaseUrl: process.env.TERMII_BASE_URL,
  termiiApiKey: process.env.TERMII_API_KEY,
});
