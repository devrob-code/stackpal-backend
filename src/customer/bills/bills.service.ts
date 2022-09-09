import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { WalletRepositoryService } from 'src/repositories/wallets/wallet-repository.service';
import { PurchaseAirtimeDto } from './dto/request/purchase-airtime.dto';
import * as moment from 'moment';
import { DataNetworkTypes } from './bills.constants';

@Injectable()
export class BillsService {
  private baseURL = this.configService.get('vtu.baseUrl');
  private apiKey = this.configService.get('vtu.apiKey');
  private publicKey = this.configService.get('vtu.publicKey');
  private privateKey = this.configService.get('vtu.privateKey');

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
      const todayDate = moment().format('YYYYMMDDHHmm');
      const requestId = todayDate + this.generateRandomString();

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
}
