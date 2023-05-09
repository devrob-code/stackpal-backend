import { Injectable } from '@nestjs/common';
import { CreateTvTransactionsUseCase } from './usecases/create-tv-transaction.usecase';
import { CreateTvTransactionDto } from 'src/customer/transactions/dto/request/create-tv-transaction.dto';
import { TvTransactionResponse } from 'src/customer/transactions/dto/response/tv-transaction.response';
import { CreateElectricityTransactionDto } from 'src/customer/transactions/dto/request/create-electricity-transaction.dto';
import { ElectricityTransactionResponse } from 'src/customer/transactions/dto/response/electricity-transaction.response';
import { CreateElectricityTransactionsUseCase } from './usecases/create-electricity-transaction.usecase';
import { CreateAirtimeDataTransactionDto } from 'src/customer/transactions/dto/request/create-airtime-data-transaction.dto';
import { AirtimeDataTransactionResponse } from 'src/customer/transactions/dto/response/airtime-data-transaction.dto';
import { CreateAirtimeDataTransactionsUseCase } from './usecases/create-airtime-data-transaction.usecase';

@Injectable()
export class TransactionRepositoryService {
  constructor(
    private readonly createTvTransactionsUseCase: CreateTvTransactionsUseCase,
    private readonly createElectricityTransactionsUseCase: CreateElectricityTransactionsUseCase,
    private readonly createAirtimeDataTransactionsUseCase: CreateAirtimeDataTransactionsUseCase,
  ) {}

  public async createTvTransactionHistory(body: CreateTvTransactionDto): Promise<TvTransactionResponse> {
    return this.createTvTransactionsUseCase.exec(body);
  }

  public async createElectricityTransactionHistory(
    body: CreateElectricityTransactionDto,
  ): Promise<ElectricityTransactionResponse> {
    return this.createElectricityTransactionsUseCase.exec(body);
  }

  public async createAirtimeDataTransactionHistory(
    body: CreateAirtimeDataTransactionDto,
  ): Promise<AirtimeDataTransactionResponse> {
    return this.createAirtimeDataTransactionsUseCase.exec(body);
  }
}
