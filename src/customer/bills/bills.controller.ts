import { Body, Controller, Get, Param, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  DataNetworkTypes,
  EducationTypes,
  ElectricityNetworkTypes,
  ElectricityPaymentTypes,
  TVNetworkTypes,
} from './bills.constants';
import { BillsService } from './bills.service';
import { PurchaseAirtimeDto } from './dto/request/purchase-airtime.dto';
import { PurchaseDataDto } from './dto/request/purchase-data.dto';
import { PurchaseEducationDto } from './dto/request/purchase-education.dto';
import { PurchaseElectricityDto } from './dto/request/purchase-electricity.dto';
import { PurchaseTVSubscriptionDto } from './dto/request/purchase-tv-subscription.dto';

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

  @Post('tv')
  public async payTVBills(@Body() body: PurchaseTVSubscriptionDto, @Request() req): Promise<any> {
    return this.billsService.payTVBills(body, req.user.id);
  }

  @Get('electricity/list')
  public async getElectricityList(): Promise<any> {
    return this.billsService.getElectricityList();
  }

  @Get('verify-meter-number/:cardNumber/:network/:type')
  public async verifyMeterNumber(
    @Param('network') network: ElectricityNetworkTypes,
    @Param('cardNumber', new ParseIntPipe()) cardNumber: number,
    @Param('type') type: ElectricityPaymentTypes,
  ): Promise<any> {
    return this.billsService.verifyMeterNumber(cardNumber, network, type);
  }

  @Post('electricity')
  public async payElectricity(@Body() body: PurchaseElectricityDto): Promise<any> {
    return this.billsService.payElectricity(body);
  }

  @Get('education/:network')
  public async getEducationPlans(@Param('network') network: EducationTypes): Promise<any> {
    return this.billsService.getEducationPlans(network);
  }

  @Post('education')
  public async payEducationBills(@Body() body: PurchaseEducationDto): Promise<any> {
    return this.billsService.payEducationBills(body);
  }
}
