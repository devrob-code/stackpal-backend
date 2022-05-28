import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FiatDeposit } from './entities/fiat-deposit.entity';
import { FiatDepositRepositoryService } from './fiat-deposit.repository.service';
import { GetFiatDepositByIdUseCase } from './usecases/get-fiat-deposit-by-id.usecase';
import { GetFiatDepositsByUserIdUseCase } from './usecases/get-fiat-deposit-by-user-id.usecase';
import { GetFiatDepositsUseCase } from './usecases/get-fiat-deposits.usecase';
import { NewFiatDepositUseCase } from './usecases/new-fiat-deposit.usecase';
import { UpdateFiatDepositByIdUseCase } from './usecases/update-fiat-deposit-by-id.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([FiatDeposit])],
  providers: [
    FiatDepositRepositoryService,
    NewFiatDepositUseCase,
    GetFiatDepositByIdUseCase,
    UpdateFiatDepositByIdUseCase,
    GetFiatDepositsUseCase,
    GetFiatDepositsByUserIdUseCase,
  ],
  exports: [FiatDepositRepositoryService],
})
export class FiatDepositRepositoryModule {}
