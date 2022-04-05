import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [CoreModule, UserModule],
})
export class AppModule {}
