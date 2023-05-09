import { Module } from '@nestjs/common';
import { TransactionsRepositoryModule } from 'src/repositories/transactions/transactions.repository.module';

@Module({
  imports: [TransactionsRepositoryModule],
})
export class TransactionsModule {}
