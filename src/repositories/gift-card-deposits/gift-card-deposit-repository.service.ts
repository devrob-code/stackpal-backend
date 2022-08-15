import { Injectable } from '@nestjs/common';
import { GiftCardDepositDto } from 'src/customer/gift-cards/dto/request/gift-card-deposit.dto';
import { GiftCardDepositResponse } from 'src/customer/gift-cards/dto/response/gift-card-deposit.response';
import { NewGiftCardDepositUseCase } from './usecases/new-gift-card-deposit.usecase';

@Injectable()
export class GiftCardDepositRepositoryService {
  constructor(
    private readonly newGiftCardDepositUseCase: NewGiftCardDepositUseCase,
  ) {}

  public async newGiftCardDeposit(
    data: GiftCardDepositDto,
  ): Promise<GiftCardDepositResponse> {
    return this.newGiftCardDepositUseCase.exec(data);
  }
}
