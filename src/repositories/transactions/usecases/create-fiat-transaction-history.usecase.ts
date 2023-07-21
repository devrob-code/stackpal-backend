import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FiatTransactions } from '../entities/fiat-transactions.entity';
import { FiatTransactionResponse } from 'src/customer/transactions/dto/response/fiat-transaction-response';

@Injectable()
export class CreateFiatTransactionHistoryUseCase {
  constructor(
    @InjectRepository(FiatTransactions)
    private readonly fiatTransactionRepo: Repository<FiatTransactions>,
  ) {}

  public async exec(fiatTransactionRepo: Partial<FiatTransactions>): Promise<FiatTransactionResponse> {
    const newFiatTransaction = this.fiatTransactionRepo.merge(new FiatTransactions(), fiatTransactionRepo);

    return this.fiatTransactionRepo.save(newFiatTransaction);
  }
}
