import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrencyQueryDto } from 'src/customer/currency/dto/request/currency-query.dto';
import { CurrencyResponse } from 'src/customer/currency/dto/response/currency.response';
import { Repository } from 'typeorm';
import { Currency } from '../entities/currency.entity';

@Injectable()
export class GetAllCurrencyUseCase {
  constructor(
    @InjectRepository(Currency)
    private readonly currencyRepo: Repository<Currency>,
  ) {}

  public async exec(query: CurrencyQueryDto): Promise<CurrencyResponse[]> {
    const whereStatement = {
      where:
        query.active !== null
          ? {
              isActive: query.active,
            }
          : {},
    };

    return await this.currencyRepo.find(whereStatement);
  }
}
