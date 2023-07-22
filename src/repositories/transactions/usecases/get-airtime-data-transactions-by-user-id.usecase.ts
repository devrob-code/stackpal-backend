import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TvTransactions } from '../entities/tv-transactions.entity';
import { TvTransactionResponse } from 'src/customer/transactions/dto/response/tv-transaction.response';
import { AirtimeDataTransactions } from '../entities/airtime-data-transactions.entity';
import { AirtimeDataTransactionResponse } from 'src/customer/transactions/dto/response/airtime-data-transaction.dto';

@Injectable()
export class GetAirtimeDataTransactionsByUserIdUseCase {
  constructor(
    @InjectRepository(AirtimeDataTransactions)
    private readonly airtimeDataTransactionsRepo: Repository<AirtimeDataTransactions>,
  ) {}

  public async exec(userId: number, limit?: number): Promise<AirtimeDataTransactionResponse[]> {
    return this.airtimeDataTransactionsRepo.find({
      where: {
        userId,
      },
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }
}
