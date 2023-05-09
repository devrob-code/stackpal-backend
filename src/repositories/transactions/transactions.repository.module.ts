import { TypeOrmModule } from '@nestjs/typeorm';
import { TvTransactions } from './entities/tv-transactions.entity';
import { Module } from '@nestjs/common';
import { TransactionRepositoryService } from './transactions.repository.service';
import { CreateTvTransactionsUseCase } from './usecases/create-tv-transaction.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([TvTransactions])],
  providers: [TransactionRepositoryService, CreateTvTransactionsUseCase],
  exports: [TransactionRepositoryService],
})
export class TransactionsRepositoryModule {}
