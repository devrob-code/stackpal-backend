import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WalletAction } from 'src/customer/wallet/wallet.constants';
import { Repository } from 'typeorm';
import { Wallet } from '../entities/wallet.entity';

@Injectable()
export class ChangeWalletBalanceUseCase {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepo: Repository<Wallet>,
  ) {}

  public async exec(id: number, amount: number, action: WalletAction): Promise<boolean> {
    let sign;
    if (action === WalletAction.increase) {
      sign = '+';
    } else if (action === WalletAction.deduct) {
      sign = '-';
    }

    const query = await this.walletRepo
      .createQueryBuilder()
      .update(Wallet)
      .set({ balance: () => `balance ${sign} ${amount}` })
      .where('id = :id', { id })
      .execute();

    return !!query;
  }

  public async execByCurrencyIdAndUserId(
    currencyId: number,
    amount: number,
    action: WalletAction,
    userId: number,
  ): Promise<boolean> {
    let sign;
    if (action === WalletAction.increase) {
      sign = '+';
    } else if (action === WalletAction.deduct) {
      sign = '-';
    }

    const query = await this.walletRepo
      .createQueryBuilder()
      .update(Wallet)
      .set({ balance: () => `balance ${sign} ${amount}` })
      .where('currencyId = :currencyId', { currencyId })
      .andWhere('userId = :userId', { userId })
      .execute();

    return !!query;
  }
}
