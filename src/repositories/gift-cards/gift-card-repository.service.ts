import { Injectable } from '@nestjs/common';
import { GiftCardDto } from 'src/customer/gift-cards/dto/request/gift-card.dto';
import { GiftCardResponse } from 'src/customer/gift-cards/dto/response/gift-card.response';
import { NewGiftCardUseCase } from './usecases/new-gift-card.usecase';

@Injectable()
export class GiftCardRepositoryService {
  constructor(private readonly newGiftCardUseCase: NewGiftCardUseCase) {}

  public async newGiftCard(body: GiftCardDto): Promise<GiftCardResponse> {
    return this.newGiftCardUseCase.exec(body);
  }
}
