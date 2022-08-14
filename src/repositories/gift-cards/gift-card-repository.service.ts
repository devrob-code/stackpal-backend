import { Injectable } from '@nestjs/common';
import {
  GiftCardDto,
  UpdateGiftCardDto,
} from 'src/admin/gift-cards/dto/request/gift-card.dto';
import { GiftCardResponse } from 'src/admin/gift-cards/dto/response/gift-card.response';
import { GetByIdUseCase } from './usecases/get-by-id.usecase';
import { NewGiftCardUseCase } from './usecases/new-gift-card.usecase';
import { UpdateGiftCardByIdUseCase } from './usecases/update-gift-card-by-id.usecase';

@Injectable()
export class GiftCardRepositoryService {
  constructor(
    private readonly newGiftCardUseCase: NewGiftCardUseCase,
    private readonly updateGiftCardByIdUseCase: UpdateGiftCardByIdUseCase,
    private readonly getByIdUseCase: GetByIdUseCase,
  ) {}

  public async newGiftCard(data: GiftCardDto): Promise<GiftCardResponse> {
    return this.newGiftCardUseCase.exec(data);
  }

  public async updateGiftCardById(
    id: number,
    body: UpdateGiftCardDto,
  ): Promise<boolean> {
    return this.updateGiftCardByIdUseCase.exec(id, body);
  }

  public async getById(id: number): Promise<GiftCardResponse> {
    return this.getByIdUseCase.exec(id);
  }
}
