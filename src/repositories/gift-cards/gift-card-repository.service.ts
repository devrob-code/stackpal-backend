import { Injectable } from '@nestjs/common';
import { GiftCardStatuses } from 'src/admin/gift-cards/gift-card.constants';
import { GiftCardResponse } from 'src/customer/gift-cards/dto/response/gift-card.response';
import { ChangeStatusUseCase } from './usecases/change-status.usecase';
import { GetAllGiftCardsUseCase } from './usecases/get-all.usecase';
import { GetByIdUseCase } from './usecases/get-by-id.usecase';
import { NewGiftCardUseCase } from './usecases/new-gift-card.usecase';

@Injectable()
export class GiftCardRepositoryService {
  constructor(
    private readonly newGiftCardUseCase: NewGiftCardUseCase,
    private readonly getAllGiftCardsUseCase: GetAllGiftCardsUseCase,
    private readonly getByIdUseCase: GetByIdUseCase,
    private readonly changeStatusUseCase: ChangeStatusUseCase,
  ) {}

  public async newGiftCard(body: any): Promise<GiftCardResponse> {
    return this.newGiftCardUseCase.exec(body);
  }

  public async getAll(): Promise<GiftCardResponse[]> {
    return this.getAllGiftCardsUseCase.exec();
  }

  public async getById(id: number): Promise<GiftCardResponse> {
    return this.getByIdUseCase.exec(id);
  }

  public async changeStatus(
    id: number,
    status: GiftCardStatuses,
    approvedBy: number,
    giftCardRate: number,
  ): Promise<boolean> {
    return this.changeStatusUseCase.exec(id, status, approvedBy, giftCardRate);
  }
}
