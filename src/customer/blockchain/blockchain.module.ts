import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MailModule } from 'src/core/mail/mail.module';
import { CurrencyRepositoryModule } from 'src/repositories/currencies/currency-repository.module';
import { UserRepositoryModule } from 'src/repositories/users/user-repository.module';
import { WalletRepositoryModule } from 'src/repositories/wallets/wallet-repository.module';
import { BlockchainController } from './blockchain.controller';
import { BlockchainService } from './blockchain.service';

@Module({
  imports: [HttpModule, WalletRepositoryModule, CurrencyRepositoryModule, UserRepositoryModule, MailModule],
  controllers: [BlockchainController],
  providers: [BlockchainService],
})
export class BlockchainModule {}
