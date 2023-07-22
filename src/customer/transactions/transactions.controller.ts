import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TransactionsService } from './transactions.service';
import { TransactionsResponse } from './dto/response/transactions.response';
import { CryptoTransactionResponse } from './dto/response/crypto-transaction.response';

@Controller('transactions')
@UseGuards(AuthGuard('jwt'))
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get('/tv/electricity')
  public async getTvElectricityTransactions(@Request() req): Promise<TransactionsResponse[]> {
    return await this.transactionsService.getTvElectricityTransactions(req.user.id);
  }

  @Get('/data/airtime')
  public async getDataAirtimeTransactions(@Request() req): Promise<TransactionsResponse[]> {
    return await this.transactionsService.getDataAirtimeTransactions(req.user.id);
  }

  @Get('/crypto/user-to-user')
  public async getCryptoHistoryBySendType(@Request() req): Promise<CryptoTransactionResponse[]> {
    return await this.transactionsService.getCryptoHistoryBySendType(req.user.id);
  }

  @Get('/crypto/user-to-user/:coin')
  public async getCryptoUserToUserByCoin(
    @Request() req,
    @Param('coin') coin: string,
  ): Promise<CryptoTransactionResponse[]> {
    return await this.transactionsService.getCryptoUserToUserByCoin(req.user.id, coin);
  }

  @Get('/fiat/recent')
  public async getRecentFiatTransactions(@Request() req): Promise<any> {
    return await this.transactionsService.getRecentFiatTransactions(req.user.id);
  }
}
