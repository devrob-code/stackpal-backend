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
import { FiatTransactions } from './entities/fiat-transactions.entity';
import { CreateFiatTransactionHistoryUseCase } from './usecases/create-fiat-transaction-history.usecase';
import { CreateCryptoTransactionHistoryUseCase } from './usecases/create-crypto-transaction-history.usecase';
import { CryptoTransactions } from './entities/crypto-transactions.entity';
import { GeUserCryptoHistoryBySendTypeUseCase } from './usecases/get-user-crypto-history-by-send-type.usecase';
import { GetCryptoUserToUserByCoinUseCase } from './usecases/get-crypto-user-to-user-by-coin.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TvTransactions,
      ElectricityTransactions,
      AirtimeDataTransactions,
      FiatTransactions,
      CryptoTransactions,
    ]),
  ],
  providers: [
    TransactionRepositoryService,
    CreateTvTransactionsUseCase,
    CreateElectricityTransactionsUseCase,
    CreateAirtimeDataTransactionsUseCase,
    GetTvTransactionsByUserIdUseCase,
    GetElectricityTransactionsByUserIdUseCase,
    GetAirtimeDataTransactionsByUserIdUseCase,
    CreateFiatTransactionHistoryUseCase,
    CreateCryptoTransactionHistoryUseCase,
    GeUserCryptoHistoryBySendTypeUseCase,
    GetCryptoUserToUserByCoinUseCase,
  ],
  exports: [TransactionRepositoryService],
})
export class TransactionsRepositoryModule {}
