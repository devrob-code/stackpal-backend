import { Injectable } from '@nestjs/common';
import { GiftCardResponse } from 'src/customer/gift-cards/dto/response/gift-card.response';
import { GetAllGiftCardsUseCase } from './usecases/get-all.usecase';
import { GetByIdUseCase } from './usecases/get-by-id.usecase';
import { NewGiftCardUseCase } from './usecases/new-gift-card.usecase';

@Injectable()
export class GiftCardRepositoryService {
  constructor(
    private readonly newGiftCardUseCase: NewGiftCardUseCase,
    private readonly getAllGiftCardsUseCase: GetAllGiftCardsUseCase,
    private readonly getByIdUseCase: GetByIdUseCase,
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
}
