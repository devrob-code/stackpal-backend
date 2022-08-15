import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GiftCardDeposit } from './entities/gift-card-deposit.entity';
import { GiftCardDepositRepositoryService } from './gift-card-deposit-repository.service';
import { NewGiftCardDepositUseCase } from './usecases/new-gift-card-deposit.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([GiftCardDeposit])],
  providers: [GiftCardDepositRepositoryService, NewGiftCardDepositUseCase],
  exports: [GiftCardDepositRepositoryService],
})
export class GiftCardDepositRepositoryModule {}
