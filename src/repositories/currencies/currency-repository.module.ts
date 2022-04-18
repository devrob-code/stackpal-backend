import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Currency } from './entities/currency.entity';
import { CurrencyRepositoryService } from './currency-repository.service';
import { GetAllCurrencyUseCase } from './usecases/get-all-currency.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Currency])],
  providers: [CurrencyRepositoryService, GetAllCurrencyUseCase],
  exports: [CurrencyRepositoryService],
})
export class CurrencyRepositoryModule {}
