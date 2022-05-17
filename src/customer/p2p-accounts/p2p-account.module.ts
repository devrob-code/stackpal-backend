import { Module } from '@nestjs/common';
import { P2PAccountRepositoryModule } from 'src/repositories/p2p-accounts/p2p-account-repository.module';
import { P2PAccountController } from './p2p-account.controller';
import { P2PAccountService } from './p2p-account.service';

@Module({
  imports: [P2PAccountRepositoryModule],
  controllers: [P2PAccountController],
  providers: [P2PAccountService],
})
export class P2PAccountModule {}
