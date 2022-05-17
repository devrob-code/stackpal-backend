import { Module } from '@nestjs/common';
import { AdminCurrencyModule } from './currency/currency.module';
import { AdminP2PAccountModule } from './p2p-accounts/p2p-account.module';

@Module({
  imports: [AdminCurrencyModule, AdminP2PAccountModule],
})
export class AdminModule {}
