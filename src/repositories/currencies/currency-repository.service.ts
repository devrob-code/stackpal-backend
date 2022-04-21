import { Injectable } from '@nestjs/common';
import { NewCurrencyDto } from 'src/admin/currency/dto/request/new-currency.dto';
import { UpdateCurrencyDto } from 'src/admin/currency/dto/request/update-currency.dto';
import { CurrencyResponse } from 'src/customer/currency/dto/response/currency.response';
import { AddNewCurrencyUseCase } from './usecases/add-new-currency.usecase';
import { DeleteCurrencyByIdUseCase } from './usecases/delete-currency-by-id.usecase';
import { GetAllCurrencyUseCase } from './usecases/get-all-currency.usecase';
import { GetCurrencyByAliasUseCase } from './usecases/get-currency-by-alias.usecase';
import { GetCurrencyByIdUseCase } from './usecases/get-currency-by-id.usecase';
import { GetCurrencyByNameUseCase } from './usecases/get-currency-by-name.usecase';
import { UpdateCurrencyByIdUseCase } from './usecases/update-currency-by-id.usecase';

@Injectable()
export class CurrencyRepositoryService {
  constructor(
    private readonly getAllCurrencyUseCase: GetAllCurrencyUseCase,
    private readonly addNewCurrencyUseCase: AddNewCurrencyUseCase,
    private readonly getCurrencyByNameUseCase: GetCurrencyByNameUseCase,
    private readonly getCurrencyByAliasUseCase: GetCurrencyByAliasUseCase,
    private readonly getCurrencyByIdUseCase: GetCurrencyByIdUseCase,
    private readonly updateCurrencyByIdUseCase: UpdateCurrencyByIdUseCase,
    private readonly deleteCurrencyByIdUseCase: DeleteCurrencyByIdUseCase,
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

  public async getByCurrencyId(id: number): Promise<CurrencyResponse> {
    return this.getCurrencyByIdUseCase.exec(id);
  }

  public async updateCurrencyById(
    id: number,
    body: UpdateCurrencyDto,
  ): Promise<boolean> {
    return this.updateCurrencyByIdUseCase.exec(id, body);
  }

  public async deleteCurrencyById(id): Promise<boolean> {
    return this.deleteCurrencyByIdUseCase.exec(id);
  }
}
