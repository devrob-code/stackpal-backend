import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CurrencyRepositoryService } from 'src/repositories/currencies/currency-repository.service';
import { CurrencyTypes } from './currency.constants';
import { CurrencyQueryDto } from './dto/request/currency-query.dto';
import { CurrencyResponse } from './dto/response/currency.response';

@Injectable()
export class CurrencyService {
  constructor(private readonly currencyRepositoryService: CurrencyRepositoryService) {}

  public async getAllCurrency(query: CurrencyQueryDto): Promise<CurrencyResponse[]> {
    const currencies = await this.currencyRepositoryService.getAllCurrency(query);
    return plainToInstance(CurrencyResponse, currencies);
  }

  public async getCurrencyById(id: number): Promise<CurrencyResponse> {
    const currency = await this.currencyRepositoryService.getByCurrencyId(id);
    return plainToInstance(CurrencyResponse, currency);
  }

  public async getAllCurrencyByType(type: CurrencyTypes): Promise<CurrencyResponse[]> {
    const currency = await this.currencyRepositoryService.getAllCurrencyByType(type);
    return plainToInstance(CurrencyResponse, currency);
  }
}
