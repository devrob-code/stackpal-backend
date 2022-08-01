import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GiftCardResponse } from 'src/customer/gift-cards/dto/response/gift-card.response';
import { Repository } from 'typeorm';
import { GiftCard } from '../entities/gift-card.entity';

@Injectable()
export class NewGiftCardUseCase {
  constructor(
    @InjectRepository(GiftCard)
    private readonly giftCardRepo: Repository<GiftCard>,
  ) {}

  public async exec(body: Partial<GiftCard>): Promise<GiftCardResponse> {
    const newGiftCard: GiftCard = this.giftCardRepo.merge(new GiftCard(), body);

    return this.giftCardRepo.save(newGiftCard);
  }
}
