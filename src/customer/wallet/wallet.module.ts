import { Module } from '@nestjs/common';
import { WalletRepositoryModule } from 'src/repositories/wallets/wallet-repository.module';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';

@Module({
  imports: [WalletRepositoryModule],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
