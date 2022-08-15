import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GiftCardDeposit } from './entities/gift-card-deposit.entity';
import { GiftCardDepositRepositoryService } from './gift-card-deposit-repository.service';
import { ChangeApprovalStatusUseCase } from './usecases/change-approval-status.usecase';
import { GetAllGiftCardDepositsUseCase } from './usecases/get-all-gift-card-deposits.usecase';
import { GetByIdUseCase } from './usecases/get-by-id.usecase';
import { GetByUserIdUseCase } from './usecases/get-by-user-id.usecase';
import { NewGiftCardDepositUseCase } from './usecases/new-gift-card-deposit.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([GiftCardDeposit])],
  providers: [
    GiftCardDepositRepositoryService,
    NewGiftCardDepositUseCase,
    ChangeApprovalStatusUseCase,
    GetByIdUseCase,
    GetAllGiftCardDepositsUseCase,
    GetByUserIdUseCase,
  ],
  exports: [GiftCardDepositRepositoryService],
})
export class GiftCardDepositRepositoryModule {}
