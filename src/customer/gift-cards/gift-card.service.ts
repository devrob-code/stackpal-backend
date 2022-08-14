import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { GiftCardResponse } from 'src/admin/gift-cards/dto/response/gift-card.response';
import { GiftCardRepositoryService } from 'src/repositories/gift-cards/gift-card-repository.service';

@Injectable()
export class GiftCardService {
  constructor(
    private readonly giftCardRepositoryService: GiftCardRepositoryService,
  ) {}

  public async getById(id: number): Promise<GiftCardResponse> {
    const giftCard = await this.giftCardRepositoryService.getById(id);
    return plainToInstance(GiftCardResponse, giftCard);
  }
}
