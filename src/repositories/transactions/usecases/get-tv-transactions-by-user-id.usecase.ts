import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TvTransactions } from '../entities/tv-transactions.entity';
import { TvTransactionResponse } from 'src/customer/transactions/dto/response/tv-transaction.response';

@Injectable()
export class GetTvTransactionsByUserIdUseCase {
  constructor(
    @InjectRepository(TvTransactions)
    private readonly tvTransactionRepo: Repository<TvTransactions>,
  ) {}

  public async exec(userId: number): Promise<TvTransactionResponse[]> {
    return this.tvTransactionRepo.find({
      where: {
        userId,
      },
      order: { createdAt: 'DESC' },
    });
  }
}
