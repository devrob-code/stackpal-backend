import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TransactionsService } from './transactions.service';
import { TransactionsResponse } from './dto/response/transactions.response';

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
}
