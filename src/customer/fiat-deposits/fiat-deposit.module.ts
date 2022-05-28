import { Module } from '@nestjs/common';
import { FiatDepositRepositoryModule } from 'src/repositories/fiat-deposits/fiat-deposit.repository.module';
import { P2PAccountRepositoryModule } from 'src/repositories/p2p-accounts/p2p-account-repository.module';
import { WalletRepositoryModule } from 'src/repositories/wallets/wallet-repository.module';
import { FiatDepositController } from './fiat-deposit.controller';
import { FiatDepositService } from './fiat-deposit.service';

@Module({
  imports: [
    FiatDepositRepositoryModule,
    P2PAccountRepositoryModule,
    WalletRepositoryModule,
  ],
  controllers: [FiatDepositController],
  providers: [FiatDepositService],
})
export class FiatDepositModule {}
