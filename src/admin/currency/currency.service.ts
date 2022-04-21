import { Injectable } from '@nestjs/common';
import { CurrencyResponse } from 'src/customer/currency/dto/response/currency.response';
import { CurrencyRepositoryService } from 'src/repositories/currencies/currency-repository.service';
import { NewCurrencyDto } from './dto/request/new-currency.dto';

@Injectable()
export class AdminCurrencyService {
  constructor(
    private readonly currencyRepositoryService: CurrencyRepositoryService,
  ) {}

  public async addNewCurrency(body: NewCurrencyDto): Promise<CurrencyResponse> {
    return await this.currencyRepositoryService.addNewCurrency(body);
  }
}
