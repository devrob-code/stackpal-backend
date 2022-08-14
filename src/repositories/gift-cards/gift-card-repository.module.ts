import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GiftCard } from './entities/gift-card.entity';
import { GiftCardRepositoryService } from './gift-card-repository.service';
import { GetByIdUseCase } from './usecases/get-by-id.usecase';
import { NewGiftCardUseCase } from './usecases/new-gift-card.usecase';
import { UpdateGiftCardByIdUseCase } from './usecases/update-gift-card-by-id.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([GiftCard])],
  providers: [
    GiftCardRepositoryService,
    NewGiftCardUseCase,
    UpdateGiftCardByIdUseCase,
    GetByIdUseCase,
  ],
  exports: [GiftCardRepositoryService],
})
export class GiftCardRepositoryModule {}
