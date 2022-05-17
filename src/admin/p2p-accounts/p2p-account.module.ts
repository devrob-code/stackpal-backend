import { Module } from '@nestjs/common';
import { P2PAccountRepositoryModule } from 'src/repositories/p2p-accounts/p2p-account-repository.module';
import { AdminP2PAccountController } from './p2p-account.controller';
import { AdminP2PAccountService } from './p2p-account.service';

@Module({
  imports: [P2PAccountRepositoryModule],
  controllers: [AdminP2PAccountController],
  providers: [AdminP2PAccountService],
})
export class AdminP2PAccountModule {}
