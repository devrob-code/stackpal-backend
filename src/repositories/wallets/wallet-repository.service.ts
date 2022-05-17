import { Injectable } from '@nestjs/common';
import { CurrencyTypes } from 'src/customer/currency/currency.constants';
import { Wallet } from './entities/wallet.entity';
import { CreateUserWalletUseCase } from './usecases/create-user-wallet.usecase';
import { GetUserWalletByCurrencyIdUseCase } from './usecases/get-user-wallet-by-currency-id.usecase';
import { GetUserWalletUseCase } from './usecases/get-user-wallet.usecase';

@Injectable()
export class WalletRepositoryService {
  constructor(
    private readonly getUserWalletUseCase: GetUserWalletUseCase,
    private readonly createUserWalletUseCase: CreateUserWalletUseCase,
    private readonly getUserWalletByCurrencyIdUseCase: GetUserWalletByCurrencyIdUseCase,
  ) {}

  public async getUserWallet(
    userId: number,
    type: CurrencyTypes,
  ): Promise<Wallet[]> {
    return this.getUserWalletUseCase.exec(userId, type);
  }

  public async createWallet(
    userId: number,
    currencyId: number,
  ): Promise<Wallet> {
    return this.createUserWalletUseCase.exec({ userId, currencyId });
  }

  public async getUserWalletByCurrencyId(
    userId: number,
    currencyId: number,
  ): Promise<Wallet> {
    return this.getUserWalletByCurrencyIdUseCase.exec(userId, currencyId);
  }
}
