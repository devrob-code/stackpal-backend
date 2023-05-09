import { Injectable } from '@nestjs/common';
import { CreateTvTransactionsUseCase } from './usecases/create-tv-transaction.usecase';
import { CreateTvTransactionDto } from 'src/customer/transactions/dto/request/create-tv-transaction.dto';
import { TvTransactionResponse } from 'src/customer/transactions/dto/response/tv-transaction.response';

@Injectable()
export class TransactionRepositoryService {
  constructor(private readonly createTvTransactionsUseCase: CreateTvTransactionsUseCase) {}

  public async createTvTransactionHistory(body: CreateTvTransactionDto): Promise<TvTransactionResponse> {
    return this.createTvTransactionsUseCase.exec(body);
  }
}
