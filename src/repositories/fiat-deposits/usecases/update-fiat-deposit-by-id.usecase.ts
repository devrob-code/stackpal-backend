import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FiatDeposit } from '../entities/fiat-deposit.entity';

@Injectable()
export class UpdateFiatDepositByIdUseCase {
  constructor(
    @InjectRepository(FiatDeposit)
    private readonly fiatDepositRepo: Repository<FiatDeposit>,
  ) {}

  public async exec(id: number, body: Partial<FiatDeposit>): Promise<boolean> {
    const updateFiatDeposit = await this.fiatDepositRepo
      .createQueryBuilder()
      .update(FiatDeposit)
      .set(body)
      .where('id = :id', { id })
      .execute();

    return !!updateFiatDeposit;
  }
}
