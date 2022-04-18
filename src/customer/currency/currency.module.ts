import { Module } from '@nestjs/common';
import { CurrencyRepositoryModule } from 'src/repositories/currencies/currency-repository.module';
import { CurrencyController } from './currency.controller';
import { CurrencyService } from './currency.service';

@Module({
  imports: [CurrencyRepositoryModule],
  controllers: [CurrencyController],
  providers: [CurrencyService],
})
export class CurrencyModule {}
