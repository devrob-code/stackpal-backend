import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GiftCardStatuses } from 'src/admin/gift-cards/gift-card.constants';
import { Repository } from 'typeorm';
import { GiftCard } from '../entities/gift-card.entity';

@Injectable()
export class ChangeStatusUseCase {
  constructor(
    @InjectRepository(GiftCard)
    private readonly giftCardRepo: Repository<GiftCard>,
  ) {}

  public async exec(
    id: number,
    status: GiftCardStatuses,
    approvedBy: number,
    giftCardRate: number,
  ): Promise<boolean> {
    const updateResult = await this.giftCardRepo
      .createQueryBuilder('giftCards')
      .update(GiftCard)
      .set({
        isApproved: status == GiftCardStatuses.approve ? true : false,
        approvedBy,
        rate: giftCardRate,
      })
      .where('id = :id', { id })
      .execute();

    return !!updateResult;
  }
}
