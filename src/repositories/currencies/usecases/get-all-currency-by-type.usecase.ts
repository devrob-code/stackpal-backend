import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrencyTypes } from 'src/customer/currency/currency.constants';
import { CurrencyResponse } from 'src/customer/currency/dto/response/currency.response';
import { Repository } from 'typeorm';
import { Currency } from '../entities/currency.entity';

@Injectable()
export class GetAllCurrencyByTypeUseCase {
  constructor(
    @InjectRepository(Currency)
    private readonly currencyRepo: Repository<Currency>,
  ) {}

  public async exec(type: CurrencyTypes): Promise<CurrencyResponse[]> {
    return this.currencyRepo.find({
      where: {
        type,
      },
    });
  }
}
