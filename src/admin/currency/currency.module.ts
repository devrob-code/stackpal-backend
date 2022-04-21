import { Module } from '@nestjs/common';
import { CurrencyRepositoryModule } from 'src/repositories/currencies/currency-repository.module';
import { AdminCurrencyController } from './currency.controller';
import { AdminCurrencyService } from './currency.service';

@Module({
  imports: [CurrencyRepositoryModule],
  controllers: [AdminCurrencyController],
  providers: [AdminCurrencyService],
})
export class AdminCurrencyModule {}
