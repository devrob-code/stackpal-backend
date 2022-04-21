import { Injectable } from '@nestjs/common';
import { CurrencyResponse } from 'src/customer/currency/dto/response/currency.response';
import { CurrencyRepositoryService } from 'src/repositories/currencies/currency-repository.service';
import { NewCurrencyDto } from './dto/request/new-currency.dto';
import { UpdateCurrencyDto } from './dto/request/update-currency.dto';

@Injectable()
export class AdminCurrencyService {
  constructor(
    private readonly currencyRepositoryService: CurrencyRepositoryService,
  ) {}

  public async addNewCurrency(body: NewCurrencyDto): Promise<CurrencyResponse> {
    return await this.currencyRepositoryService.addNewCurrency(body);
  }

  public async updateCurrencyById(
    id: number,
    body: UpdateCurrencyDto,
  ): Promise<boolean> {
    return await this.currencyRepositoryService.updateCurrencyById(id, body);
  }

  public async deleteCurrencyById(id: number): Promise<boolean> {
    return await this.currencyRepositoryService.deleteCurrencyById(id);
  }
}
