import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { GiftCardResponse } from 'src/admin/gift-cards/dto/response/gift-card.response';
import { GiftCardDepositRepositoryService } from 'src/repositories/gift-card-deposits/gift-card-deposit-repository.service';
import { GiftCardRepositoryService } from 'src/repositories/gift-cards/gift-card-repository.service';
import { GiftCardDepositDto } from './dto/request/gift-card-deposit.dto';
import { GiftCardDepositResponse } from './dto/response/gift-card-deposit.response';

@Injectable()
export class GiftCardService {
  constructor(
    private readonly giftCardRepositoryService: GiftCardRepositoryService,
    private readonly giftCardDepositRepositoryService: GiftCardDepositRepositoryService,
  ) {}

  public async getById(id: number): Promise<GiftCardResponse> {
    const giftCard = await this.giftCardRepositoryService.getById(id);
    return plainToInstance(GiftCardResponse, giftCard);
  }

  public async getAll(): Promise<GiftCardResponse[]> {
    const giftCard = await this.giftCardRepositoryService.getAll();
    return plainToInstance(GiftCardResponse, giftCard);
  }

  public async newGiftCardDeposit(
    data: GiftCardDepositDto,
  ): Promise<GiftCardDepositResponse> {
    return this.giftCardDepositRepositoryService.newGiftCardDeposit(data);
  }
}
