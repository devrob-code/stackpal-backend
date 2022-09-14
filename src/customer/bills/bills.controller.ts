import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DataNetworkTypes, TVNetworkTypes } from './bills.constants';
import { BillsService } from './bills.service';
import { PurchaseAirtimeDto } from './dto/request/purchase-airtime.dto';
import { PurchaseDataDto } from './dto/request/purchase-data.dto';

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

  @Post('data')
  public async buyDataPlan(@Body() body: PurchaseDataDto): Promise<any> {
    return this.billsService.buyDataPlan(body);
  }

  @Get('tv/:network')
  public async getTVPlans(@Param('network') network: TVNetworkTypes): Promise<any> {
    return this.billsService.getTVPlan(network);
  }

  @Get('verify-card-number/:network/:cardNumber')
  public async verifyCardNumber(
    @Param('network') network: TVNetworkTypes,
    @Param('cardNumber', new ParseIntPipe()) cardNumber: number,
  ): Promise<any> {
    return this.billsService.verifyCardNumber(cardNumber, network);
  }
}
