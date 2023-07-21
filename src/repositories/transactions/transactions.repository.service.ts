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
import { GetTvTransactionsByUserIdUseCase } from './usecases/get-tv-transactions-by-user-id.usecase';
import { GetElectricityTransactionsByUserIdUseCase } from './usecases/get-electricity-transactions-by-user-id.usecase';
import { GetAirtimeDataTransactionsByUserIdUseCase } from './usecases/get-airtime-data-transactions-by-user-id.usecase';
import { CreateFiatTransactionDto } from 'src/customer/transactions/dto/request/create-fiat-transaction-dto';
import { FiatTransactionResponse } from 'src/customer/transactions/dto/response/fiat-transaction-response';
import { CreateFiatTransactionHistoryUseCase } from './usecases/create-fiat-transaction-history.usecase';
import { CreateCryptoTransactionDto } from 'src/customer/transactions/dto/request/create-crypto-transaction.dto';
import { CryptoTransactionResponse } from 'src/customer/transactions/dto/response/crypto-transaction.response';
import { CreateCryptoTransactionHistoryUseCase } from './usecases/create-crypto-transaction-history.usecase';
import { GeUserCryptoHistoryBySendTypeUseCase } from './usecases/get-user-crypto-history-by-send-type.usecase';

@Injectable()
export class TransactionRepositoryService {
  constructor(
    private readonly createTvTransactionsUseCase: CreateTvTransactionsUseCase,
    private readonly createElectricityTransactionsUseCase: CreateElectricityTransactionsUseCase,
    private readonly createAirtimeDataTransactionsUseCase: CreateAirtimeDataTransactionsUseCase,
    private readonly getTvTransactionsByUserIdUseCase: GetTvTransactionsByUserIdUseCase,
    private readonly getElectricityTransactionsByUserIdUseCase: GetElectricityTransactionsByUserIdUseCase,
    private readonly getAirtimeDataTransactionsByUserIdUseCase: GetAirtimeDataTransactionsByUserIdUseCase,
    private readonly createFiatTransactionHistoryUseCase: CreateFiatTransactionHistoryUseCase,
    private readonly createCryptoTransactionHistoryUseCase: CreateCryptoTransactionHistoryUseCase,
    private readonly geUserCryptoHistoryBySendTypeUseCase: GeUserCryptoHistoryBySendTypeUseCase,
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

  public async getTvTransactionsByUserId(userId: number): Promise<TvTransactionResponse[]> {
    return this.getTvTransactionsByUserIdUseCase.exec(userId);
  }

  public async getElectricityTransactionsByUserId(userId: number): Promise<ElectricityTransactionResponse[]> {
    return this.getElectricityTransactionsByUserIdUseCase.exec(userId);
  }

  public async getAirtimeDataTransactionsByUserId(userId: number): Promise<AirtimeDataTransactionResponse[]> {
    return this.getAirtimeDataTransactionsByUserIdUseCase.exec(userId);
  }

  public async createFiatTransactionHistory(body: CreateFiatTransactionDto): Promise<FiatTransactionResponse> {
    return this.createFiatTransactionHistoryUseCase.exec(body);
  }

  public async createCryptoTransactionHistory(body: CreateCryptoTransactionDto): Promise<CryptoTransactionResponse> {
    return this.createCryptoTransactionHistoryUseCase.exec(body);
  }
  public async geUserCryptoHistoryBySendType(userId: number): Promise<CryptoTransactionResponse[]> {
    return this.geUserCryptoHistoryBySendTypeUseCase.exec(userId);
  }
}
