import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GiftCardReceipts } from '../entities/gift-card-receipts.entity';
import { GiftCardReceiptResponse } from 'src/admin/gift-cards/dto/response/gift-card-receipt.response';

@Injectable()
export class GetGiftCardReceiptsByGiftCardNameUseCase {
  constructor(
    @InjectRepository(GiftCardReceipts)
    private readonly giftCardReceiptsRepo: Repository<GiftCardReceipts>,
  ) {}

  public async exec(name): Promise<GiftCardReceiptResponse[]> {
    return await this.giftCardReceiptsRepo.find({ where: { giftCardName: name }, order: { createdAt: 'ASC' } });
  }
}
