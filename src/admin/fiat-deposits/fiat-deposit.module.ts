import { Module } from '@nestjs/common';
import { FiatDepositRepositoryModule } from 'src/repositories/fiat-deposits/fiat-deposit.repository.module';
import { WalletRepositoryModule } from 'src/repositories/wallets/wallet-repository.module';
import { AdminFiatDepositController } from './fiat-deposit.controller';
import { AdminFiatDepositService } from './fiat-deposit.service';

@Module({
  imports: [FiatDepositRepositoryModule, WalletRepositoryModule],
  controllers: [AdminFiatDepositController],
  providers: [AdminFiatDepositService],
})
export class AdminFiatDepositModule {}
