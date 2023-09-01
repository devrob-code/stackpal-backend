import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GiftCardResponse } from 'src/admin/gift-cards/dto/response/gift-card.response';
import { Repository } from 'typeorm';
import { WithdrawalRequest } from '../entities/withdrawal-requests.entity';

@Injectable()
export class GetAllWithdrawalRequestByUserIdUseCase {
  constructor(
    @InjectRepository(WithdrawalRequest)
    private readonly withdrawalRequestRepo: Repository<WithdrawalRequest>,
  ) {}

  public async exec(userId: number): Promise<WithdrawalRequest[]> {
    return this.withdrawalRequestRepo.find({
      where: {
        userId,
      },
    });
  }
}
