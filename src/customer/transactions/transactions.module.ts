import { Module } from '@nestjs/common';
import { TransactionsRepositoryModule } from 'src/repositories/transactions/transactions.repository.module';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

@Module({
  imports: [TransactionsRepositoryModule],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
