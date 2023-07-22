import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AirtimeDataTransactions } from '../entities/airtime-data-transactions.entity';
import { AirtimeDataTransactionResponse } from 'src/customer/transactions/dto/response/airtime-data-transaction.dto';
import { CryptoTransactions } from '../entities/crypto-transactions.entity';
import { CryptoTransactionResponse } from 'src/customer/transactions/dto/response/crypto-transaction.response';
import { CryptoTransactionSendType } from 'src/customer/transactions/transactions.constants';

@Injectable()
export class GetCryptoUserToUserByCoinUseCase {
  constructor(
    @InjectRepository(CryptoTransactions)
    private readonly cryptoTransactionsRepo: Repository<CryptoTransactions>,
  ) {}

  public async exec(userId: number, coin: string): Promise<CryptoTransactionResponse[]> {
    return this.cryptoTransactionsRepo.find({
      where: {
        userId,
        sendType: CryptoTransactionSendType.userToUser,
        network: coin.toLocaleLowerCase(),
      },
      relations: ['user', 'receiver'],
      order: { createdAt: 'DESC' },
      take: 5,
    });
  }
}
