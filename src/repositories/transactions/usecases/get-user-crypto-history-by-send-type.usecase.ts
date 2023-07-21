import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AirtimeDataTransactions } from '../entities/airtime-data-transactions.entity';
import { AirtimeDataTransactionResponse } from 'src/customer/transactions/dto/response/airtime-data-transaction.dto';
import { CryptoTransactions } from '../entities/crypto-transactions.entity';
import { CryptoTransactionResponse } from 'src/customer/transactions/dto/response/crypto-transaction.response';
import { CryptoTransactionSendType } from 'src/customer/transactions/transactions.constants';

@Injectable()
export class GeUserCryptoHistoryBySendTypeUseCase {
  constructor(
    @InjectRepository(CryptoTransactions)
    private readonly cryptoTransactionsRepo: Repository<CryptoTransactions>,
  ) {}

  public async exec(userId: number): Promise<CryptoTransactionResponse[]> {
    return this.cryptoTransactionsRepo.find({
      where: {
        userId,
        sendType: CryptoTransactionSendType.userToUser,
      },
      relations: ['user', 'receiver'],
      order: { createdAt: 'DESC' },
    });
  }
}
