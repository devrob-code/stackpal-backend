import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GiftCard } from '../entities/gift-card.entity';
import { GiftCardResponse } from 'src/admin/gift-cards/dto/response/gift-card.response';

@Injectable()
export class GetGiftCardDenominationByNameUseCase {
  constructor(
    @InjectRepository(GiftCard)
    private readonly giftCardRepo: Repository<GiftCard>,
  ) {}

  public async exec(name): Promise<GiftCardResponse[]> {
    return await this.giftCardRepo.find({ where: { name }, order: { createdAt: 'ASC' } });
  }
}
