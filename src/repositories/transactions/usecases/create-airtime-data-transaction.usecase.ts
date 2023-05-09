import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AirtimeDataTransactions } from '../entities/airtime-data-transactions.entity';
import { AirtimeDataTransactionResponse } from 'src/customer/transactions/dto/response/airtime-data-transaction.dto';

@Injectable()
export class CreateAirtimeDataTransactionsUseCase {
  constructor(
    @InjectRepository(AirtimeDataTransactions)
    private readonly airtimeDataTransactionRepo: Repository<AirtimeDataTransactions>,
  ) {}

  public async exec(airtimeDataTransaction: Partial<AirtimeDataTransactions>): Promise<AirtimeDataTransactionResponse> {
    const newAirtimeDataTransaction = this.airtimeDataTransactionRepo.merge(
      new AirtimeDataTransactions(),
      airtimeDataTransaction,
    );

    return this.airtimeDataTransactionRepo.save(newAirtimeDataTransaction);
  }
}
