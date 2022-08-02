import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rate } from './entity/rate.entity';
import { RateRepositoryService } from './rate-repository.service';
import { GetRateUseCase } from './usecases/get-rate';

@Module({
  imports: [TypeOrmModule.forFeature([Rate])],
  providers: [RateRepositoryService, GetRateUseCase],
  exports: [RateRepositoryService],
})
export class RateRepositoryModule {}
