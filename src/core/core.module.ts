import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration';
import { DbModule } from './db/db.module';
import { HelperModule } from './helpers/helper.module';

const envFilePath = process.env.NODE_ENV === 'test' ? './.test.env' : './.env';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      load: [configuration],
      isGlobal: true,
    }),
    DbModule,
  ],
})
export class CoreModule {}
