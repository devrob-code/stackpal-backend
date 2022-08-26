import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FiatDepositResponse } from 'src/customer/fiat-deposits/dto/response/fiat-deposit.response';
import { Repository } from 'typeorm';
import { FiatDeposit } from '../entities/fiat-deposit.entity';

@Injectable()
export class GetFiatDepositsUseCase {
  constructor(
    @InjectRepository(FiatDeposit)
    private readonly fiatDepositRepo: Repository<FiatDeposit>,
  ) {}

  public async exec(): Promise<FiatDepositResponse[]> {
    return this.fiatDepositRepo.find({
      relations: ['p2pAccount', 'wallet', 'wallet.user', 'wallet.currency'],
    });
  }
}
