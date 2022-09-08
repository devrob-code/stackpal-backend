import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { WalletRepositoryModule } from 'src/repositories/wallets/wallet-repository.module';
import { BillsController } from './bills.controller';
import { BillsService } from './bills.service';

@Module({
  imports: [HttpModule, WalletRepositoryModule],
  controllers: [BillsController],
  providers: [BillsService],
})
export class BillsModule {}
