import { Module } from '@nestjs/common';
import { GiftCardDepositRepositoryModule } from 'src/repositories/gift-card-deposits/gift-card-deposit-repository.module';
import { GiftCardRepositoryModule } from 'src/repositories/gift-cards/gift-card-repository.module';
import { AdminGiftCardController } from './gift-card.controller';
import { AdminGiftCardService } from './gift-card.service';

@Module({
  imports: [GiftCardRepositoryModule, GiftCardDepositRepositoryModule],
  controllers: [AdminGiftCardController],
  providers: [AdminGiftCardService],
})
export class AdminGiftCardModule {}
