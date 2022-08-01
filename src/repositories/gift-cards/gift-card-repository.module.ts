import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GiftCardRepositoryService } from './gift-card-repository.service';
import { GiftCard } from './entities/gift-card.entity';
import { NewGiftCardUseCase } from './usecases/new-gift-card.usecase';
import { GetAllGiftCardsUseCase } from './usecases/get-all.usecase';
import { GetByIdUseCase } from './usecases/get-by-id.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([GiftCard])],
  providers: [
    GiftCardRepositoryService,
    NewGiftCardUseCase,
    GetAllGiftCardsUseCase,
    GetByIdUseCase,
  ],
  exports: [GiftCardRepositoryService],
})
export class GiftCardRepositoryModule {}
