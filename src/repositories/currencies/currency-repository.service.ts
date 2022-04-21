import { Injectable } from '@nestjs/common';
import { NewCurrencyDto } from 'src/admin/currency/dto/request/new-currency.dto';
import { CurrencyResponse } from 'src/customer/currency/dto/response/currency.response';
import { AddNewCurrencyUseCase } from './usecases/add-new-currency.usecase';
import { GetAllCurrencyUseCase } from './usecases/get-all-currency.usecase';
import { GetCurrencyByAliasUseCase } from './usecases/get-currency-by-alias.usecase';
import { GetCurrencyByNameUseCase } from './usecases/get-currency-by-name.usecase';

@Injectable()
export class CurrencyRepositoryService {
  constructor(
    private readonly getAllCurrencyUseCase: GetAllCurrencyUseCase,
    private readonly addNewCurrencyUseCase: AddNewCurrencyUseCase,
    private readonly getCurrencyByNameUseCase: GetCurrencyByNameUseCase,
    private readonly getCurrencyByAliasUseCase: GetCurrencyByAliasUseCase,
  ) {}

  public async getAllCurrency(): Promise<CurrencyResponse[]> {
    return this.getAllCurrencyUseCase.exec();
  }

  public async addNewCurrency(body: NewCurrencyDto): Promise<CurrencyResponse> {
    return this.addNewCurrencyUseCase.exec(body);
  }

  public async getByCurrencyName(name: string): Promise<CurrencyResponse> {
    return this.getCurrencyByNameUseCase.exec(name);
  }

  public async getByCurrencyAlias(alias: string): Promise<CurrencyResponse> {
    return this.getCurrencyByAliasUseCase.exec(alias);
  }
}
