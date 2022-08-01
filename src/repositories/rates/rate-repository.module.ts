import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rate } from './entity/entity';
import { RateRepositoryService } from './rate-repository.service';
import { GetGiftCardRateUseCase } from './usecases/get-gift-card-rate';

@Module({
  imports: [TypeOrmModule.forFeature([Rate])],
  providers: [RateRepositoryService, GetGiftCardRateUseCase],
  exports: [RateRepositoryService],
})
export class RateRepositoryModule {}
