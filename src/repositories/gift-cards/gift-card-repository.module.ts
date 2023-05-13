import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GiftCard } from './entities/gift-card.entity';
import { GiftCardRepositoryService } from './gift-card-repository.service';
import { GetAllGiftCardsUseCase } from './usecases/get-all.usecase';
import { GetByIdUseCase } from './usecases/get-by-id.usecase';
import { NewGiftCardUseCase } from './usecases/new-gift-card.usecase';
import { UpdateGiftCardByIdUseCase } from './usecases/update-gift-card-by-id.usecase';
import { GetActiveGiftCardsUseCase } from './usecases/get-active-gift-cards.usecase';
import { GetGiftCardDenominationByNameUseCase } from './usecases/get-gift-card-denomination-by-name.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([GiftCard])],
  providers: [
    GiftCardRepositoryService,
    NewGiftCardUseCase,
    UpdateGiftCardByIdUseCase,
    GetByIdUseCase,
    GetAllGiftCardsUseCase,
    GetActiveGiftCardsUseCase,
    GetGiftCardDenominationByNameUseCase,
  ],
  exports: [GiftCardRepositoryService],
})
export class GiftCardRepositoryModule {}
