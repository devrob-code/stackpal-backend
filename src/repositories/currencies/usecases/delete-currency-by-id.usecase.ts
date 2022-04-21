import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Currency } from '../entities/currency.entity';

@Injectable()
export class DeleteCurrencyByIdUseCase {
  constructor(
    @InjectRepository(Currency)
    private readonly currencyRepo: Repository<Currency>,
  ) {}

  public async exec(id: number): Promise<boolean> {
    const deleteCurrency = await this.currencyRepo
      .createQueryBuilder()
      .delete()
      .from(Currency)
      .where('id = :id', { id })
      .execute();

    return !!deleteCurrency;
  }
}
