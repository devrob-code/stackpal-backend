import { Module } from '@nestjs/common';
import { WithdrawalRequestRepositoryModule } from 'src/repositories/withdrawal-requests/withdrawal-request.repository.module';
import { WithdrawalRequestController } from './withdrawal-request.controller';
import { WithdrawalRequestService } from './withdrawal-request.service';
import { HelperModule } from 'src/core/helpers/helper.module';

@Module({
  imports: [WithdrawalRequestRepositoryModule, HelperModule],
  controllers: [WithdrawalRequestController],
  providers: [WithdrawalRequestService],
})
export class WithdrawalRequestModule {}
