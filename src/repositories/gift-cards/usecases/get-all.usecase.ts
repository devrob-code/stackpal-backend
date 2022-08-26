import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GiftCardResponse } from 'src/admin/gift-cards/dto/response/gift-card.response';
import { Repository } from 'typeorm';
import { GiftCard } from '../entities/gift-card.entity';

@Injectable()
export class GetAllGiftCardsUseCase {
  constructor(
    @InjectRepository(GiftCard)
    private readonly giftCardRepo: Repository<GiftCard>,
  ) {}

  public async exec(): Promise<GiftCardResponse[]> {
    return this.giftCardRepo.find({
      relations: ['user'],
    });
  }
}
