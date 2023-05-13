import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { GiftCardResponse, GiftCardResponseDto } from 'src/admin/gift-cards/dto/response/gift-card.response';
import { GiftCardDepositRepositoryService } from 'src/repositories/gift-card-deposits/gift-card-deposit-repository.service';
import { GiftCardRepositoryService } from 'src/repositories/gift-cards/gift-card-repository.service';
import { GiftCardDepositDto } from './dto/request/gift-card-deposit.dto';
import { GiftCardDepositResponse } from './dto/response/gift-card-deposit.response';
import { ActiveGiftCardResponse } from './dto/response/active-gift-card.response';

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

  public async getAll(): Promise<GiftCardResponseDto> {
    let response: any = {};
    const giftCard = await this.giftCardRepositoryService.getAll();

    response.status = true;
    response.data = giftCard;
    return plainToInstance(GiftCardResponseDto, response);
  }

  public async newGiftCardDeposit(data: GiftCardDepositDto): Promise<GiftCardDepositResponse> {
    data.isCredited = false;
    return this.giftCardDepositRepositoryService.newGiftCardDeposit(data);
  }

  public async getByUserId(userId: number): Promise<GiftCardDepositResponse[]> {
    const giftCardDeposit = await this.giftCardDepositRepositoryService.getByUserId(userId);
    return plainToInstance(GiftCardDepositResponse, giftCardDeposit);
  }

  public async getActiveGiftCards(): Promise<ActiveGiftCardResponse> {
    let response: any = {};
    let giftCards = await this.giftCardRepositoryService.getActiveGiftCards();

    response.status = true;
    response.data = giftCards;

    return plainToInstance(ActiveGiftCardResponse, response);
  }

  public async getGiftCardDenominationByName(name: string): Promise<GiftCardResponseDto> {
    const giftCards = await this.giftCardRepositoryService.getGiftCardDenominationByName(name);
    const response = { status: true, data: giftCards };

    return plainToInstance(GiftCardResponseDto, response);
  }
}
