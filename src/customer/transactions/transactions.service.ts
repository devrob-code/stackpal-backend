import { Injectable } from '@nestjs/common';
import { TransactionRepositoryService } from 'src/repositories/transactions/transactions.repository.service';
import { TransactionsResponse } from './dto/response/transactions.response';

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
}
