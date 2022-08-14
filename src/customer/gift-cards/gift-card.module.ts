import { Module } from '@nestjs/common';
import { GiftCardRepositoryModule } from 'src/repositories/gift-cards/gift-card-repository.module';
import { GiftCardController } from './gift-card.controller';
import { GiftCardService } from './gift-card.service';

@Module({
  imports: [GiftCardRepositoryModule],
  controllers: [GiftCardController],
  providers: [GiftCardService],
})
export class GiftCardModule {}
