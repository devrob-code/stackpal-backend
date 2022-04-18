import { Injectable } from '@nestjs/common';
import { CurrencyResponse } from 'src/customer/currency/dto/response/currency.response';
import { GetAllCurrencyUseCase } from './usecases/get-all-currency.usecase';

@Injectable()
export class CurrencyRepositoryService {
  constructor(private readonly getAllCurrencyUseCase: GetAllCurrencyUseCase) {}

  public async getAllCurrency(): Promise<CurrencyResponse[]> {
    return this.getAllCurrencyUseCase.exec();
  }
}
