import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Currency } from './entities/currency.entity';
import { CurrencyRepositoryService } from './currency-repository.service';
import { GetAllCurrencyUseCase } from './usecases/get-all-currency.usecase';
import { AddNewCurrencyUseCase } from './usecases/add-new-currency.usecase';
import { GetCurrencyByNameUseCase } from './usecases/get-currency-by-name.usecase';
import { GetCurrencyByAliasUseCase } from './usecases/get-currency-by-alias.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Currency])],
  providers: [
    CurrencyRepositoryService,
    GetAllCurrencyUseCase,
    AddNewCurrencyUseCase,
    GetCurrencyByNameUseCase,
    GetCurrencyByAliasUseCase,
  ],
  exports: [CurrencyRepositoryService],
})
export class CurrencyRepositoryModule {}
