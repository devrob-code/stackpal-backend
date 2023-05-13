import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GiftCard } from '../entities/gift-card.entity';
import { ActiveGiftCardResponseData } from 'src/customer/gift-cards/dto/response/active-gift-card.response';

@Injectable()
export class GetActiveGiftCardsUseCase {
  constructor(
    @InjectRepository(GiftCard)
    private readonly giftCardRepo: Repository<GiftCard>,
  ) {}

  public async exec(): Promise<ActiveGiftCardResponseData[]> {
    return await this.giftCardRepo.query(`
      SELECT
	    DISTINCT ON (name) name, "imageUrl", id
      FROM
	    "giftCards" 
    `);
  }
}
