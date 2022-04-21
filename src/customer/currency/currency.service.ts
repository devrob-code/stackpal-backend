import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CurrencyRepositoryService } from 'src/repositories/currencies/currency-repository.service';
import { CurrencyResponse } from './dto/response/currency.response';

@Injectable()
export class CurrencyService {
  constructor(
    private readonly currencyRepositoryService: CurrencyRepositoryService,
  ) {}

  public async getAllCurrency(): Promise<CurrencyResponse[]> {
    const currencies = await this.currencyRepositoryService.getAllCurrency();
    return plainToInstance(CurrencyResponse, currencies);
  }

  public async getCurrencyById(currencyId): Promise<CurrencyResponse> {
    const currency = await this.currencyRepositoryService.getByCurrencyId(
      currencyId,
    );
    return plainToInstance(CurrencyResponse, currency);
  }
}
