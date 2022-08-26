import { Module } from '@nestjs/common';
import { RateRepositoryModule } from 'src/repositories/rates/rate-repository.module';
import { RateService } from './rate.service';

@Module({
  imports: [RateRepositoryModule],
  //controllers: [RateController],
  providers: [RateService],
})
export class RateModule {}
