import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GiftCardRepositoryService } from './gift-card-repoistory.service';
import { GiftCard } from './entities/gift-card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GiftCard])],
  providers: [GiftCardRepositoryService],
  exports: [GiftCardRepositoryService],
})
export class GiftCardRepositoryModule {}
