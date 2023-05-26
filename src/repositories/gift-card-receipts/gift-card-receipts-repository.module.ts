import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GiftCardReceipts } from './entities/gift-card-receipts.entity';
import { GiftCardReceiptsRepositoryService } from './gift-card-receipts.repository.service';
import { AddNewGiftCardReceiptUseCase } from './usecases/add-new-gift-card-receipt.usecase';
import { GetGiftCardReceiptsByGiftCardNameUseCase } from './usecases/get-gift-card-receipts-by-gitft-card-name.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([GiftCardReceipts])],
  providers: [
    GiftCardReceiptsRepositoryService,
    AddNewGiftCardReceiptUseCase,
    GetGiftCardReceiptsByGiftCardNameUseCase,
  ],
  exports: [GiftCardReceiptsRepositoryService],
})
export class GiftCardReceiptsRepositoryModule {}
