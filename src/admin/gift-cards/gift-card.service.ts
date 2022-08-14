import { Injectable } from '@nestjs/common';
import { GiftCardRepositoryService } from 'src/repositories/gift-cards/gift-card-repository.service';
import { GiftCardDto } from './dto/request/gift-card.dto';
import { GiftCardResponse } from './dto/response/gift-card.response';

@Injectable()
export class AdminGiftCardService {
  constructor(
    private readonly giftCardRepositoryService: GiftCardRepositoryService,
  ) {}

  public async addNewGiftCard(data: GiftCardDto): Promise<GiftCardResponse> {
    return this.giftCardRepositoryService.newGiftCard(data);
  }
}
