import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrencyTypes } from 'src/customer/currency/currency.constants';
import { Repository } from 'typeorm';
import { Wallet } from '../entities/wallet.entity';

@Injectable()
export class GetUserWalletByCurrencyIdUseCase {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepo: Repository<Wallet>,
  ) {}

  public async exec(userId: number, currencyId: number): Promise<Wallet> {
    return await this.walletRepo.findOne({
      where: {
        userId,
        currencyId,
      },
    });
  }
}
