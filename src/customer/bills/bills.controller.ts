import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DataNetworkTypes } from './bills.constants';
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

  @Get('data/:network')
  public async getDataPlan(@Param('network') network: DataNetworkTypes): Promise<any> {
    return this.billsService.getDataPlan(network);
  }
}
