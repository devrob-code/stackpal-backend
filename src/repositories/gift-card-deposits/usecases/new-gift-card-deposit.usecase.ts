import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GiftCardDepositResponse } from 'src/customer/gift-cards/dto/response/gift-card-deposit.response';
import { Repository } from 'typeorm';
import { GiftCardDeposit } from '../entities/gift-card-deposit.entity';

@Injectable()
export class NewGiftCardDepositUseCase {
  constructor(
    @InjectRepository(GiftCardDeposit)
    private readonly giftCardDepositRepo: Repository<GiftCardDeposit>,
  ) {}

  public async exec(
    body: Partial<GiftCardDeposit>,
  ): Promise<GiftCardDepositResponse> {
    const newGiftDepositCard: GiftCardDeposit = this.giftCardDepositRepo.merge(
      new GiftCardDeposit(),
      body,
    );

    return this.giftCardDepositRepo.save(newGiftDepositCard);
  }
}
