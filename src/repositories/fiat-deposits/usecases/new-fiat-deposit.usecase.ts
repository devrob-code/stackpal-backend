import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrencyResponse } from 'src/customer/currency/dto/response/currency.response';
import { FiatDepositResponse } from 'src/customer/fiat-deposits/dto/response/fiat-deposit.response';
import { Repository } from 'typeorm';
import { FiatDeposit } from '../entities/fiat-deposit.entity';

@Injectable()
export class NewFiatDepositUseCase {
  constructor(
    @InjectRepository(FiatDeposit)
    private readonly fiatDepositRepo: Repository<FiatDeposit>,
  ) {}

  public async exec(body: Partial<FiatDeposit>): Promise<FiatDepositResponse> {
    const newFiatDeposit: FiatDeposit = this.fiatDepositRepo.merge(
      new FiatDeposit(),
      body,
    );

    return this.fiatDepositRepo.save(newFiatDeposit);
  }
}
