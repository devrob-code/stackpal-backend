import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BillsService } from './bills.service';
import { PurchaseAirtimeDto } from './dto/request/purchase-airtime.dto';

@Controller('bills')
@UseGuards(AuthGuard('jwt'))
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  @Get('wallet/balance')
  public async getBillsWalletBalance(): Promise<any> {
    return this.billsService.getBillsWalletBalance();
  }

  @Post('airtime')
  public async purchaseAirtime(@Body() body: PurchaseAirtimeDto): Promise<any> {
    return this.billsService.purchaseAirtime(body);
  }
}
