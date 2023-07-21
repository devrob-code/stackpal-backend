import { Module } from '@nestjs/common';
import { TransactionsRepositoryModule } from 'src/repositories/transactions/transactions.repository.module';
import { UserToUserController } from './user-to-user.controller';
import { UserToUserService } from './user-to-user.service';
import { HelperModule } from 'src/core/helpers/helper.module';
import { MailModule } from 'src/core/mail/mail.module';
import { WalletRepositoryModule } from 'src/repositories/wallets/wallet-repository.module';
import { UserRepositoryModule } from 'src/repositories/users/user-repository.module';

@Module({
  imports: [
    TransactionsRepositoryModule,
    HelperModule,
    MailModule,
    WalletRepositoryModule,
    TransactionsRepositoryModule,
    UserRepositoryModule,
  ],
  controllers: [UserToUserController],
  providers: [UserToUserService],
})
export class UserToUserModule {}
