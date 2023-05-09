import { TypeOrmModule } from '@nestjs/typeorm';
import { TvTransactions } from './entities/tv-transactions.entity';
import { Module } from '@nestjs/common';
import { TransactionRepositoryService } from './transactions.repository.service';
import { CreateTvTransactionsUseCase } from './usecases/create-tv-transaction.usecase';
import { CreateElectricityTransactionsUseCase } from './usecases/create-electricity-transaction.usecase';
import { ElectricityTransactions } from './entities/electricity-transactions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TvTransactions, ElectricityTransactions])],
  providers: [TransactionRepositoryService, CreateTvTransactionsUseCase, CreateElectricityTransactionsUseCase],
  exports: [TransactionRepositoryService],
})
export class TransactionsRepositoryModule {}
