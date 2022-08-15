import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GiftCardDeposit } from '../entities/gift-card-deposit.entity';
@Injectable()
export class ChangeApprovalStatusUseCase {
  constructor(
    @InjectRepository(GiftCardDeposit)
    private readonly giftCardDepositRepo: Repository<GiftCardDeposit>,
  ) {}

  public async exec(
    id: number,
    status: boolean,
    approvedBy: number,
  ): Promise<boolean> {
    const updateGiftCardDeposit = this.giftCardDepositRepo
      .createQueryBuilder()
      .update('giftCardDeposits')
      .set({ isApproved: status, approvedBy, isCredited: true })
      .where('id = :id', { id: id })
      .execute();

    return !!updateGiftCardDeposit;
  }
}
