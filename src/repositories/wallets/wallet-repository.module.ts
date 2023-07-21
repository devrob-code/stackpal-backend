import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { ChangeWalletBalanceUseCase } from './usecases/change-wallet-balance.usecase';
import { CreateUserWalletUseCase } from './usecases/create-user-wallet.usecase';
import { GetByIdAndUserIdUseCase } from './usecases/get-by-id-and-user-id.usecase';
import { GetByIdUseCase } from './usecases/get-by-id.usecase';
import { GetUserWalletByCurrencyIdUseCase } from './usecases/get-user-wallet-by-currency-id.usecase';
import { GetUserWalletUseCase } from './usecases/get-user-wallet.usecase';
import { WalletRepositoryService } from './wallet-repository.service';
import { GetWalletByUserIdUsecase } from './usecases/get-wallet-by-user-id.usecase';
import { GetWalletByUserIdAndNetworkUsecase } from './usecases/get-wallet-by-user-id-and-network.usecase';
import { GetByCurrencyIdAndUserIdUseCase } from './usecases/get-by-currency-id-and-user-id.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet])],
  providers: [
    WalletRepositoryService,
    GetUserWalletUseCase,
    CreateUserWalletUseCase,
    GetUserWalletByCurrencyIdUseCase,
    GetByIdUseCase,
    GetByIdAndUserIdUseCase,
    ChangeWalletBalanceUseCase,
    GetWalletByUserIdUsecase,
    GetWalletByUserIdAndNetworkUsecase,
    GetByCurrencyIdAndUserIdUseCase,
  ],
  exports: [WalletRepositoryService],
})
export class WalletRepositoryModule {}
