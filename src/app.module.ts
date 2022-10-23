import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { BillsModule } from './customer/bills/bills.module';
import { BlockchainModule } from './customer/blockchain/blockchain.module';
import { CurrencyModule } from './customer/currency/currency.module';
import { FiatDepositModule } from './customer/fiat-deposits/fiat-deposit.module';
import { GiftCardModule } from './customer/gift-cards/gift-card.module';
import { P2PAccountModule } from './customer/p2p-accounts/p2p-account.module';
//import { RateModule } from './customer/rates/rate.module';
import { WalletModule } from './customer/wallet/wallet.module';
import { UserModule } from './user/user.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot(),
    CoreModule,
    UserModule,
    AuthModule,
    AdminModule,
    CurrencyModule,
    WalletModule,
    P2PAccountModule,
    FiatDepositModule,
    GiftCardModule,
    BlockchainModule,
    BillsModule,
    //RateModule,
  ],
})
export class AppModule {}
