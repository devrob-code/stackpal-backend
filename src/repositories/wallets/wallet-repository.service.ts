import { Injectable } from '@nestjs/common';
import { CurrencyTypes } from 'src/customer/currency/currency.constants';
import { WalletAction } from 'src/customer/wallet/wallet.constants';
import { Wallet } from './entities/wallet.entity';
import { ChangeWalletBalanceUseCase } from './usecases/change-wallet-balance.usecase';
import { CreateUserWalletUseCase } from './usecases/create-user-wallet.usecase';
import { GetByIdAndUserIdUseCase } from './usecases/get-by-id-and-user-id.usecase';
import { GetByIdUseCase } from './usecases/get-by-id.usecase';
import { GetUserWalletByCurrencyIdUseCase } from './usecases/get-user-wallet-by-currency-id.usecase';
import { GetUserWalletUseCase } from './usecases/get-user-wallet.usecase';
import { GetWalletByUserIdAndNetworkUsecase } from './usecases/get-wallet-by-user-id-and-network.usecase';
import { GetWalletByUserIdUsecase } from './usecases/get-wallet-by-user-id.usecase';
import { GetByCurrencyIdAndUserIdUseCase } from './usecases/get-by-currency-id-and-user-id.usecase';

@Injectable()
export class WalletRepositoryService {
  constructor(
    private readonly getUserWalletUseCase: GetUserWalletUseCase,
    private readonly createUserWalletUseCase: CreateUserWalletUseCase,
    private readonly getUserWalletByCurrencyIdUseCase: GetUserWalletByCurrencyIdUseCase,
    private readonly getByIdUseCase: GetByIdUseCase,
    private readonly getByIdAndUserIdUseCase: GetByIdAndUserIdUseCase,
    private readonly changeWalletBalanceUseCase: ChangeWalletBalanceUseCase,
    private readonly getWalletByUserIdUsecase: GetWalletByUserIdUsecase,
    private readonly getWalletByUserIdAndNetworkUsecase: GetWalletByUserIdAndNetworkUsecase,
    private readonly getByCurrencyIdAndUserIdUseCase: GetByCurrencyIdAndUserIdUseCase,
  ) {}

  public async getUserWallet(userId: number, type: CurrencyTypes): Promise<Wallet[]> {
    return this.getUserWalletUseCase.exec(userId, type);
  }

  public async createWallet(userId: number, currencyId: number): Promise<Wallet> {
    return this.createUserWalletUseCase.exec({ userId, currencyId });
  }

  public async getUserWalletByCurrencyId(userId: number, currencyId: number): Promise<Wallet> {
    return this.getUserWalletByCurrencyIdUseCase.exec(userId, currencyId);
  }

  public async getById(id: number): Promise<Wallet> {
    return this.getByIdUseCase.exec(id);
  }

  public async getByIdAndUserId(id: number, userId: number): Promise<Wallet> {
    return this.getByIdAndUserIdUseCase.exec(id, userId);
  }

  public async getWalletsByUserId(userId: number, network?: string): Promise<Wallet[]> {
    return this.getWalletByUserIdUsecase.exec(userId, network);
  }

  public async changeWalletBalance(id: number, amount: number, action: WalletAction) {
    return this.changeWalletBalanceUseCase.exec(id, amount, action);
  }

  public async getWalletByUserIdAndNetwork(userId: number, network: string): Promise<Wallet> {
    return this.getWalletByUserIdAndNetworkUsecase.exec(userId, network);
  }

  public async changeWalletBalanceByCurrencyIdAndUserId(
    userId: number,
    amount: number,
    action: WalletAction,
    currencyId: number,
  ) {
    return this.changeWalletBalanceUseCase.execByCurrencyIdAndUserId(currencyId, amount, action, userId);
  }

  public async getByCurrencyIdAndUserId(currencyId: number, userId: number): Promise<Wallet> {
    return this.getByCurrencyIdAndUserIdUseCase.exec(currencyId, userId);
  }
}
