import { TypeOrmModule } from '@nestjs/typeorm';
import { TvTransactions } from './entities/tv-transactions.entity';
import { Module } from '@nestjs/common';
import { TransactionRepositoryService } from './transactions.repository.service';
import { CreateTvTransactionsUseCase } from './usecases/create-tv-transaction.usecase';
import { CreateElectricityTransactionsUseCase } from './usecases/create-electricity-transaction.usecase';
import { ElectricityTransactions } from './entities/electricity-transactions.entity';
import { CreateAirtimeDataTransactionsUseCase } from './usecases/create-airtime-data-transaction.usecase';
import { AirtimeDataTransactions } from './entities/airtime-data-transactions.entity';
import { GetTvTransactionsByUserIdUseCase } from './usecases/get-tv-transactions-by-user-id.usecase';
import { GetElectricityTransactionsByUserIdUseCase } from './usecases/get-electricity-transactions-by-user-id.usecase';
import { GetAirtimeDataTransactionsByUserIdUseCase } from './usecases/get-airtime-data-transactions-by-user-id.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([TvTransactions, ElectricityTransactions, AirtimeDataTransactions])],
  providers: [
    TransactionRepositoryService,
    CreateTvTransactionsUseCase,
    CreateElectricityTransactionsUseCase,
    CreateAirtimeDataTransactionsUseCase,
    GetTvTransactionsByUserIdUseCase,
    GetElectricityTransactionsByUserIdUseCase,
    GetAirtimeDataTransactionsByUserIdUseCase,
  ],
  exports: [TransactionRepositoryService],
})
export class TransactionsRepositoryModule {}
