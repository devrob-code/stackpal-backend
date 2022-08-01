import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { GiftCardResponse } from 'src/customer/gift-cards/dto/response/gift-card.response';
import { GiftCardRepositoryService } from 'src/repositories/gift-cards/gift-card-repository.service';

@Injectable()
export class AdminGiftCardService {
  constructor(
    private readonly giftCardRepositoryService: GiftCardRepositoryService,
  ) {}

  public async getAllGiftCards(): Promise<GiftCardResponse[]> {
    const giftCards = await this.giftCardRepositoryService.getAll();

    return plainToInstance(GiftCardResponse, giftCards);
  }

  // public async approve(id: number): Promise<boolean> {
  //   return this.giftCardRepositoryService.approve();
  // }
}
