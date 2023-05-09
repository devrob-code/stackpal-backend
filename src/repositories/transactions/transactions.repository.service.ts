import { Injectable } from '@nestjs/common';
import { CreateTvTransactionsUseCase } from './usecases/create-tv-transaction.usecase';
import { CreateTvTransactionDto } from 'src/customer/transactions/dto/request/create-tv-transaction.dto';
import { TvTransactionResponse } from 'src/customer/transactions/dto/response/tv-transaction.response';
import { CreateElectricityTransactionDto } from 'src/customer/transactions/dto/request/create-electricity-transaction.dto';
import { ElectricityTransactionResponse } from 'src/customer/transactions/dto/response/electricity-transaction.response';
import { CreateElectricityTransactionsUseCase } from './usecases/create-electricity-transaction.usecase';

@Injectable()
export class TransactionRepositoryService {
  constructor(
    private readonly createTvTransactionsUseCase: CreateTvTransactionsUseCase,
    private readonly createElectricityTransactionsUseCase: CreateElectricityTransactionsUseCase,
  ) {}

  public async createTvTransactionHistory(body: CreateTvTransactionDto): Promise<TvTransactionResponse> {
    return this.createTvTransactionsUseCase.exec(body);
  }

  public async createElectricityTransactionHistory(
    body: CreateElectricityTransactionDto,
  ): Promise<ElectricityTransactionResponse> {
    return this.createElectricityTransactionsUseCase.exec(body);
  }
}
