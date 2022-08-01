import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { GiftCardRepositoryService } from 'src/repositories/gift-cards/gift-card-repository.service';
import { GiftCardDto } from './dto/request/gift-card.dto';
import { GiftCardResponse } from './dto/response/gift-card.response';

@Injectable()
export class GiftCardService {
  constructor(
    private readonly giftCardRepositoryService: GiftCardRepositoryService,
  ) {}

  public async newGiftCard(body: GiftCardDto): Promise<GiftCardResponse> {
    const newGiftCard = await this.giftCardRepositoryService.newGiftCard(body);
    return plainToInstance(GiftCardResponse, newGiftCard);
  }

  public async getById(id: number): Promise<GiftCardResponse> {
    const giftCard = await this.giftCardRepositoryService.getById(id);
    return plainToInstance(GiftCardResponse, giftCard);
  }
}
