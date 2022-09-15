import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { WalletRepositoryService } from 'src/repositories/wallets/wallet-repository.service';
import { PurchaseAirtimeDto } from './dto/request/purchase-airtime.dto';
import * as moment from 'moment';
import {
  DataNetworkTypes,
  ElectricityList,
  ElectricityNetworkTypes,
  ElectricityPaymentTypes,
  TVNetworkTypes,
  TVSubscriptionType,
} from './bills.constants';
import { PurchaseDataDto } from './dto/request/purchase-data.dto';
import { PurchaseTVSubscriptionDto } from './dto/request/purchase-tv-subscription.dto';
import { PurchaseElectricityDto } from './dto/request/purchase-electricity.dto';

@Injectable()
export class BillsService {
  private baseURL = this.configService.get('vtu.baseUrl');
  private apiKey = this.configService.get('vtu.apiKey');
  private publicKey = this.configService.get('vtu.publicKey');
  private privateKey = this.configService.get('vtu.privateKey');
  private todayDate = moment().format('YYYYMMDDHHmm');

  constructor(
    private httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly walletRepositoryService: WalletRepositoryService,
  ) {}

  private generateRandomString(): string {
    return (Math.random() + 1).toString(36).substring(2);
  }

  public async getBillsWalletBalance(): Promise<any> {
    try {
      const url = `${this.baseURL}/balance`;
      const { data } = await firstValueFrom(
        this.httpService.get(url, { headers: { 'api-key': this.apiKey, 'public-key': this.publicKey } }),
      );

      return data.contents.balance;
    } catch (e) {
      throw new HttpException(e.response.data, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async purchaseAirtime(body: PurchaseAirtimeDto): Promise<any> {
    try {
      const url = `${this.baseURL}/pay`;
      const requestId = this.todayDate + this.generateRandomString();

      const { data } = await firstValueFrom(
        this.httpService.post(
          url,
          { request_id: requestId, serviceID: body.network, amount: body.amount, phone: `0${parseInt(body.phone)}` },
          { headers: { 'api-key': this.apiKey, 'secret-key': this.privateKey } },
        ),
      );

      return data;
    } catch (e) {
      throw new HttpException(e.response.data, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getDataPlan(network: DataNetworkTypes): Promise<any> {
    try {
      let url;

      if (network === DataNetworkTypes.smile) {
        url = `${this.baseURL}/service-variations?serviceID=${network}-direct`;
      } else if (network === DataNetworkTypes.spectranet) {
        url = `${this.baseURL}/service-variations?serviceID=${network}`;
      } else {
        url = `${this.baseURL}/service-variations?serviceID=${network}-data`;
      }

      const { data } = await firstValueFrom(
        this.httpService.get(url, { headers: { 'api-key': this.apiKey, 'public-key': this.publicKey } }),
      );

      return data;
    } catch (e) {
      throw new HttpException(e.response.data, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async buyDataPlan(body: PurchaseDataDto): Promise<any> {
    try {
      const url = `${this.baseURL}/pay`;
      const requestId = this.todayDate + this.generateRandomString();
      let serviceId;
      if (body.network === DataNetworkTypes.smile) {
        serviceId = `${body.network}-direct`;
      } else if (body.network === DataNetworkTypes.spectranet) {
        serviceId = `${body.network}`;
      } else {
        serviceId = `${body.network}-data`;
      }

      const { data } = await firstValueFrom(
        this.httpService.post(
          url,
          {
            request_id: requestId,
            serviceID: serviceId,
            variation_code: body.variationCode,
            phone: `0${parseInt(body.phone)}`,
            billersCode: body.billersCode,
          },
          { headers: { 'api-key': this.apiKey, 'secret-key': this.privateKey } },
        ),
      );

      return data;
    } catch (e) {
      throw new HttpException(e.response.data, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getTVPlan(network: TVNetworkTypes): Promise<any> {
    try {
      let url = `${this.baseURL}/service-variations?serviceID=${network}`;

      const { data } = await firstValueFrom(
        this.httpService.get(url, { headers: { 'api-key': this.apiKey, 'public-key': this.publicKey } }),
      );

      return data;
    } catch (e) {
      throw new HttpException(e.response.data, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async verifyCardNumber(cardNumber: number, network: TVNetworkTypes): Promise<any> {
    try {
      const url = `${this.baseURL}/merchant-verify`;

      const { data } = await firstValueFrom(
        this.httpService.post(
          url,
          {
            serviceID: network,
            billersCode: cardNumber,
          },
          { headers: { 'api-key': this.apiKey, 'secret-key': this.privateKey } },
        ),
      );

      return data;
    } catch (e) {
      throw new HttpException(e.response.data, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async payTVBills(body: PurchaseTVSubscriptionDto): Promise<any> {
    try {
      const { network, billersCode, amount, phone, variationCode } = body;
      const url = `${this.baseURL}/pay`;
      const requestId = this.todayDate + this.generateRandomString();

      const { data } = await firstValueFrom(
        this.httpService.post(
          url,
          {
            request_id: requestId,
            serviceID: network,
            billersCode,
            amount,
            phone: `${parseInt(phone)}`,
            subscription_type: TVSubscriptionType.renew,
            variation_code: variationCode,
          },
          { headers: { 'api-key': this.apiKey, 'secret-key': this.privateKey } },
        ),
      );

      return data;
    } catch (e) {
      throw new HttpException(e.response.data, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getElectricityList(): Promise<any> {
    return ElectricityList;
  }

  public async verifyMeterNumber(
    cardNumber: number,
    network: ElectricityNetworkTypes,
    type: ElectricityPaymentTypes,
  ): Promise<any> {
    try {
      const url = `${this.baseURL}/merchant-verify`;

      const { data } = await firstValueFrom(
        this.httpService.post(
          url,
          {
            serviceID: network,
            billersCode: cardNumber,
            type,
          },
          { headers: { 'api-key': this.apiKey, 'secret-key': this.privateKey } },
        ),
      );

      return data;
    } catch (e) {
      throw new HttpException(e.response.data, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async payElectricity(body: PurchaseElectricityDto): Promise<any> {
    try {
      const { network, billersCode, amount, phone, variationCode } = body;
      const url = `${this.baseURL}/pay`;
      const requestId = this.todayDate + this.generateRandomString();

      const { data } = await firstValueFrom(
        this.httpService.post(
          url,
          {
            request_id: requestId,
            serviceID: network,
            billersCode,
            amount,
            phone: `${parseInt(phone)}`,
            subscription_type: TVSubscriptionType.renew,
            variation_code: variationCode,
          },
          { headers: { 'api-key': this.apiKey, 'secret-key': this.privateKey } },
        ),
      );

      return data;
    } catch (e) {
      throw new HttpException(e.response.data, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
