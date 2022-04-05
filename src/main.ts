import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import {
  Logger,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { HttpExceptionFilter } from './common/exceptions/httpExceptionFilter';

const port = process.env.PORT;

const startServer = async (app) => {
  await app.listen(port);
};

const setupNestApp = (app) => {
  app.useGlobalPipes(createValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupNestApp(app);

  await startServer(app);
  Logger.log(`Server started running on http://localhost:${port}`, 'Bootstrap');
}

const createValidationPipe = () => {
  return new ValidationPipe({
    transform: true,
    whitelist: true,
    exceptionFactory: (errors) => {
      return new UnprocessableEntityException(errors);
    },
  });
};

bootstrap();
