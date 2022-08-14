import { Injectable } from '@nestjs/common';
import { GiftCardResponse } from 'src/admin/gift-cards/dto/response/gift-card.response';
import { NewGiftCardUseCase } from './usecases/new-gift-card.usecase';

@Injectable()
export class GiftCardRepositoryService {
  constructor(private readonly newGiftCardUseCase: NewGiftCardUseCase) {}

  public async newGiftCard(data: any): Promise<GiftCardResponse> {
    return this.newGiftCardUseCase.exec(data);
  }
}
