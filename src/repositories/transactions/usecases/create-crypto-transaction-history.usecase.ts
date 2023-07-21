import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FiatTransactions } from '../entities/fiat-transactions.entity';
import { FiatTransactionResponse } from 'src/customer/transactions/dto/response/fiat-transaction-response';
import { CryptoTransactions } from '../entities/crypto-transactions.entity';
import { CryptoTransactionResponse } from 'src/customer/transactions/dto/response/crypto-transaction.response';

@Injectable()
export class CreateCryptoTransactionHistoryUseCase {
  constructor(
    @InjectRepository(CryptoTransactions)
    private readonly cryptoTransactionRepo: Repository<CryptoTransactions>,
  ) {}

  public async exec(cryptoTransactionRepo: Partial<CryptoTransactions>): Promise<CryptoTransactionResponse> {
    const newCryptoTransaction = this.cryptoTransactionRepo.merge(new CryptoTransactions(), cryptoTransactionRepo);

    return this.cryptoTransactionRepo.save(newCryptoTransaction);
  }
}
