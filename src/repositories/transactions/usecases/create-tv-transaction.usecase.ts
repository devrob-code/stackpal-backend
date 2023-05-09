import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TvTransactions } from '../entities/tv-transactions.entity';
import { TvTransactionResponse } from 'src/customer/transactions/dto/response/tv-transaction.response';

@Injectable()
export class CreateTvTransactionsUseCase {
  constructor(
    @InjectRepository(TvTransactions)
    private readonly tvTransactionRepo: Repository<TvTransactions>,
  ) {}

  public async exec(tvTransaction: Partial<TvTransactions>): Promise<TvTransactionResponse> {
    const newTvTransaction = this.tvTransactionRepo.merge(new TvTransactions(), tvTransaction);

    return this.tvTransactionRepo.save(newTvTransaction);
  }
}
