import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FiatDepositResponse } from 'src/customer/fiat-deposits/dto/response/fiat-deposit.response';
import { Repository } from 'typeorm';
import { FiatDeposit } from '../entities/fiat-deposit.entity';

@Injectable()
export class GetFiatDepositsByUserIdUseCase {
  constructor(
    @InjectRepository(FiatDeposit)
    private readonly fiatDepositRepo: Repository<FiatDeposit>,
  ) {}

  public async exec(userId: number): Promise<FiatDepositResponse[]> {
    return this.fiatDepositRepo.find({
      relations: [
        'user',
        'p2pAccount',
        'wallet',
        'wallet.user',
        'wallet.currency',
      ],
      where: {
        userId,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
