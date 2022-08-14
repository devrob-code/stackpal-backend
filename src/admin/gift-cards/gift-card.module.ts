import { Module } from '@nestjs/common';
import { GiftCardRepositoryModule } from 'src/repositories/gift-cards/gift-card-repository.module';
import { AdminGiftCardController } from './gift-card.controller';
import { AdminGiftCardService } from './gift-card.service';

@Module({
  imports: [GiftCardRepositoryModule],
  controllers: [AdminGiftCardController],
  providers: [AdminGiftCardService],
})
export class AdminGiftCardModule {}
