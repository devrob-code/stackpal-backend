import { Module } from '@nestjs/common';
import { GiftCardDepositRepositoryModule } from 'src/repositories/gift-card-deposits/gift-card-deposit-repository.module';
import { GiftCardRepositoryModule } from 'src/repositories/gift-cards/gift-card-repository.module';
import { GiftCardController } from './gift-card.controller';
import { GiftCardService } from './gift-card.service';
import { HelperModule } from 'src/core/helpers/helper.module';

@Module({
  imports: [GiftCardRepositoryModule, GiftCardDepositRepositoryModule, HelperModule],
  controllers: [GiftCardController],
  providers: [GiftCardService],
})
export class GiftCardModule {}
