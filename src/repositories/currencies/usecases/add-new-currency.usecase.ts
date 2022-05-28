import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrencyResponse } from 'src/customer/currency/dto/response/currency.response';
import { Repository } from 'typeorm';
import { Currency } from '../entities/currency.entity';

@Injectable()
export class AddNewCurrencyUseCase {
  constructor(
    @InjectRepository(Currency)
    private readonly currencyRepo: Repository<Currency>,
  ) {}

  public async exec(body: Partial<Currency>): Promise<CurrencyResponse> {
    const newCurrency: Currency = this.currencyRepo.merge(new Currency(), body);

    return this.currencyRepo.save(newCurrency);
  }
}
