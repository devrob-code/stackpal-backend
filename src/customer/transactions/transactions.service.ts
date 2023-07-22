import { Injectable } from '@nestjs/common';
import { TransactionRepositoryService } from 'src/repositories/transactions/transactions.repository.service';
import { TransactionsResponse } from './dto/response/transactions.response';
import { plainToClass } from 'class-transformer';
import { CryptoTransactionResponse } from './dto/response/crypto-transaction.response';
import { LIMIT_FOUR, LIMIT_TWO } from './transactions.constants';

@Injectable()
export class TransactionsService {
  constructor(private readonly transactionRepositoryService: TransactionRepositoryService) {}

  public async getTvElectricityTransactions(userId): Promise<any> {
    const tvTransactions = await this.transactionRepositoryService.getTvTransactionsByUserId(userId);
    const electricityTransactions = await this.transactionRepositoryService.getElectricityTransactionsByUserId(userId);

    const transactions = [...tvTransactions, ...electricityTransactions];

    transactions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return { status: true, transactions };
  }

  public async getDataAirtimeTransactions(userId): Promise<any> {
    const airtimeDataTransactions = await this.transactionRepositoryService.getAirtimeDataTransactionsByUserId(userId);

    return { status: true, airtimeDataTransactions };
  }

  public async getCryptoHistoryBySendType(userId): Promise<any> {
    let cryptoTransactions = await this.transactionRepositoryService.geUserCryptoHistoryBySendType(userId);

    cryptoTransactions = plainToClass(CryptoTransactionResponse, cryptoTransactions);

    return { status: true, cryptoTransactions };
  }

  public async getCryptoUserToUserByCoin(userId: number, coin: string): Promise<any> {
    let cryptoTransactions = await this.transactionRepositoryService.getCryptoUserToUserByCoin(userId, coin);

    cryptoTransactions = plainToClass(CryptoTransactionResponse, cryptoTransactions);

    return { status: true, cryptoTransactions };
  }

  public async getRecentFiatTransactions(userId: number): Promise<any> {
    const tvTransactions = await this.transactionRepositoryService.getTvTransactionsByUserId(userId, LIMIT_TWO);
    const electricityTransactions = await this.transactionRepositoryService.getElectricityTransactionsByUserId(
      userId,
      LIMIT_TWO,
    );
    const airtimeDataTransactions = await this.transactionRepositoryService.getAirtimeDataTransactionsByUserId(
      userId,
      LIMIT_FOUR,
    );

    const tvElectricityTransactions = [...tvTransactions, ...electricityTransactions];
    const transactions: any = [...tvElectricityTransactions, ...airtimeDataTransactions];

    transactions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return { status: true, transactions };
  }
}
