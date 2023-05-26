import { Injectable } from '@nestjs/common';
import { GiftCardReceiptDto } from 'src/admin/gift-cards/dto/request/gift-card-receipt.dto';
import { GiftCardReceiptResponse } from 'src/admin/gift-cards/dto/response/gift-card-receipt.response';
import { AddNewGiftCardReceiptUseCase } from './usecases/add-new-gift-card-receipt.usecase';
import { GetGiftCardReceiptsByGiftCardNameUseCase } from './usecases/get-gift-card-receipts-by-gitft-card-name.usecase';

@Injectable()
export class GiftCardReceiptsRepositoryService {
  constructor(
    private readonly addNewGiftCardReceiptUseCase: AddNewGiftCardReceiptUseCase,
    private readonly getGiftCardReceiptsByGiftCardNameUseCase: GetGiftCardReceiptsByGiftCardNameUseCase,
  ) {}

  public async addNewGiftCardReceipt(data: GiftCardReceiptDto): Promise<GiftCardReceiptResponse> {
    return this.addNewGiftCardReceiptUseCase.exec(data);
  }

  public async getGiftCardReceiptsByGiftCardName(name: string): Promise<GiftCardReceiptResponse[]> {
    return await this.getGiftCardReceiptsByGiftCardNameUseCase.exec(name);
  }
}
