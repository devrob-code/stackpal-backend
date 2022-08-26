import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { WalletRepositoryModule } from 'src/repositories/wallets/wallet-repository.module';
import { BlockchainController } from './blockchain.controller';
import { BlockchainService } from './blockchain.service';

@Module({
  imports: [HttpModule, WalletRepositoryModule],
  controllers: [BlockchainController],
  providers: [BlockchainService],
})
export class BlockchainModule {}
