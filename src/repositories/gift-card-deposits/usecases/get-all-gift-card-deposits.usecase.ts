import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  GiftCardDepositResponse,
  GiftCardDepositResponseData,
} from 'src/customer/gift-cards/dto/response/gift-card-deposit.response';
import { Repository } from 'typeorm';
import { GiftCardDeposit } from '../entities/gift-card-deposit.entity';

@Injectable()
export class GetAllGiftCardDepositsUseCase {
  constructor(
    @InjectRepository(GiftCardDeposit)
    private readonly giftCardDepositRepo: Repository<GiftCardDeposit>,
  ) {}

  public async exec(): Promise<GiftCardDepositResponseData[]> {
    return this.giftCardDepositRepo.find({
      relations: ['user'],
    });
  }
}
