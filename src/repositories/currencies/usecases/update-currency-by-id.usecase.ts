import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Currency } from '../entities/currency.entity';

@Injectable()
export class UpdateCurrencyByIdUseCase {
  constructor(
    @InjectRepository(Currency)
    private readonly currencyRepo: Repository<Currency>,
  ) {}

  public async exec(id: number, body: Partial<Currency>): Promise<boolean> {
    const updateCurrency = await this.currencyRepo
      .createQueryBuilder()
      .update(Currency)
      .set(body)
      .where('id = :id', { id })
      .execute();

    return !!updateCurrency;
  }
}
