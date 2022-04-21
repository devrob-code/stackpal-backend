import { Module } from '@nestjs/common';
import { AdminCurrencyModule } from './currency/currency.module';

@Module({
  imports: [AdminCurrencyModule],
})
export class AdminModule {}
