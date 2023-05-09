import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { WalletRepositoryModule } from 'src/repositories/wallets/wallet-repository.module';
import { BillsController } from './bills.controller';
import { BillsService } from './bills.service';
import { TransactionsRepositoryModule } from 'src/repositories/transactions/transactions.repository.module';
import { HelperModule } from 'src/core/helpers/helper.module';
import { MailModule } from 'src/core/mail/mail.module';
import { UserRepositoryModule } from 'src/repositories/users/user-repository.module';

@Module({
  imports: [
    HttpModule,
    HelperModule,
    MailModule,
    WalletRepositoryModule,
    TransactionsRepositoryModule,
    UserRepositoryModule,
  ],
  controllers: [BillsController],
  providers: [BillsService],
})
export class BillsModule {}
