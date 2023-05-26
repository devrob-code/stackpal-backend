import { Module } from '@nestjs/common';
import { GiftCardDepositRepositoryModule } from 'src/repositories/gift-card-deposits/gift-card-deposit-repository.module';
import { GiftCardRepositoryModule } from 'src/repositories/gift-cards/gift-card-repository.module';
import { AdminGiftCardController } from './gift-card.controller';
import { AdminGiftCardService } from './gift-card.service';
import { GiftCardReceiptsRepositoryModule } from 'src/repositories/gift-card-receipts/gift-card-receipts-repository.module';

@Module({
  imports: [GiftCardRepositoryModule, GiftCardDepositRepositoryModule, GiftCardReceiptsRepositoryModule],
  controllers: [AdminGiftCardController],
  providers: [AdminGiftCardService],
})
export class AdminGiftCardModule {}
