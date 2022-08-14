import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GiftCard } from './entities/gift-card.entity';
import { GiftCardRepositoryService } from './gift-card-repository.service';
import { NewGiftCardUseCase } from './usecases/new-gift-card.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([GiftCard])],
  providers: [GiftCardRepositoryService, NewGiftCardUseCase],
  exports: [GiftCardRepositoryService],
})
export class GiftCardRepositoryModule {}
