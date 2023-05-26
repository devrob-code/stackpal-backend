import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GiftCardResponse } from 'src/admin/gift-cards/dto/response/gift-card.response';
import { Repository } from 'typeorm';
import { GiftCardReceipts } from '../entities/gift-card-receipts.entity';
import { GiftCardReceiptResponse } from 'src/admin/gift-cards/dto/response/gift-card-receipt.response';

@Injectable()
export class AddNewGiftCardReceiptUseCase {
  constructor(
    @InjectRepository(GiftCardReceipts)
    private readonly giftCardReceiptsRepo: Repository<GiftCardReceipts>,
  ) {}

  public async exec(body: Partial<GiftCardReceipts>): Promise<GiftCardReceiptResponse> {
    const newGiftCardReceipt: GiftCardReceipts = this.giftCardReceiptsRepo.merge(new GiftCardReceipts(), body);

    return this.giftCardReceiptsRepo.save(newGiftCardReceipt);
  }
}
