import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { Logger, UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exceptions/httpExceptionFilter';
import { ConfigService } from '@nestjs/config';

const startServer = async (app) => {
  const configService = app.get(ConfigService);
  const port = configService.get('port');
  await app.listen(port);
};

const setupNestApp = (app) => {
  app.useGlobalPipes(createValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
};

const setupCors = (app) => {
  app.enableCors();
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('port');

  setupNestApp(app);
  setupCors(app);

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
