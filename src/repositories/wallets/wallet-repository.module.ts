import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { CreateUserWalletUseCase } from './usecases/create-user-wallet.usecase';
import { GetUserWalletByCurrencyIdUseCase } from './usecases/get-user-wallet-by-currency-id.usecase';
import { GetUserWalletUseCase } from './usecases/get-user-wallet.usecase';
import { WalletRepositoryService } from './wallet-repository.service';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet])],
  providers: [
    WalletRepositoryService,
    GetUserWalletUseCase,
    CreateUserWalletUseCase,
    GetUserWalletByCurrencyIdUseCase,
  ],
  exports: [WalletRepositoryService],
})
export class WalletRepositoryModule {}
