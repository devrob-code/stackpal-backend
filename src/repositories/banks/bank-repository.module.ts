import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankRepositoryService } from './bank-repository.service';
import { GetAllBanksUseCase } from './usecases/get-all-banks.usecase';
import { Banks } from './entities/bank.entity';
import { GetUserBankAccountsUseCase } from './usecases/get-user-bank-accounts.usecase';
import { BankAccounts } from './entities/bank-account.entity';
import { AddNewBankAccountUseCase } from './usecases/add-new-bank-account.usecase';
import { DeleteBankAccountByUserIdAndIdUseCase } from './usecases/delete-bank-account-by-user-id-and-id.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Banks, BankAccounts])],
  providers: [
    BankRepositoryService,
    GetAllBanksUseCase,
    GetUserBankAccountsUseCase,
    AddNewBankAccountUseCase,
    DeleteBankAccountByUserIdAndIdUseCase,
  ],
  exports: [BankRepositoryService],
})
export class BankRepositoryModule {}
