import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { WalletRepositoryService } from 'src/repositories/wallets/wallet-repository.service';
import { PurchaseAirtimeDto } from './dto/request/purchase-airtime.dto';
import * as moment from 'moment';
import {
  AirtimePaymentType,
  DataNetworkTypes,
  EducationTypes,
  ElectricityList,
  ElectricityNetworkTypes,
  ElectricityPaymentTypes,
  TVNetworkTypes,
  TVSubscriptionType,
} from './bills.constants';
import { PurchaseDataDto } from './dto/request/purchase-data.dto';
import { PurchaseTVSubscriptionDto } from './dto/request/purchase-tv-subscription.dto';
import { PurchaseElectricityDto } from './dto/request/purchase-electricity.dto';
import { PurchaseEducationDto } from './dto/request/purchase-education.dto';
import { TransactionRepositoryService } from 'src/repositories/transactions/transactions.repository.service';
import { HelperService } from 'src/core/helpers/helper.service';
import { MailService } from 'src/core/mail/mail.service';
import { UserRepositoryService } from 'src/repositories/users/user-repository.service';
import { AirtimeDataTypes } from '../transactions/transactions.constants';
import { NAIRA_CURRENCY_ID, WalletAction } from '../wallet/wallet.constants';

@Injectable()
export class BillsService {
  private baseURL = this.configService.get('vtu.baseUrl');
  private apiKey = this.configService.get('vtu.apiKey');
  private publicKey = this.configService.get('vtu.publicKey');
  private privateKey = this.configService.get('vtu.privateKey');

  constructor(
    private httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly helperService: HelperService,
    private readonly mailService: MailService,
    private readonly transactionRepositoryService: TransactionRepositoryService,
    private readonly userRepositoryService: UserRepositoryService,
    private readonly walletRepsitoryService: WalletRepositoryService,
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

  public async purchaseAirtime(body: PurchaseAirtimeDto, userId: number): Promise<any> {
    try {
      const url = `${this.baseURL}/pay`;
      const requestId = moment().utcOffset('+0100').format('YYYYMMDDHHmm') + this.generateRandomString();
      const user = await this.userRepositoryService.getById(userId);
      const userWallet = await this.walletRepsitoryService.getUserWalletByCurrencyId(userId, NAIRA_CURRENCY_ID);

      if (userWallet.balance < body.amount * 100) {
        return new HttpException(
          'You have Insufficient balance to make continue with this transaction',
          HttpStatus.BAD_REQUEST,
        );
      }

      const { data } = await firstValueFrom(
        this.httpService.post(
          url,
          { request_id: requestId, serviceID: body.network, amount: body.amount, phone: `0${parseInt(body.phone)}` },
          { headers: { 'api-key': this.apiKey, 'secret-key': this.privateKey } },
        ),
      );

      // Log into transactions
      this.transactionRepositoryService
        .createAirtimeDataTransactionHistory({
          txId: this.helperService.generateTransactionId('SPAL_', 8),
          userId: userId,
          amount: body.amount * 100, // Convert to KOBO
          network: body.network,
          plan: AirtimePaymentType.prepaid,
          recipient: body.phone,
          billerTxId: data.content.transactions.transactionId,
          status: data.content.transactions.status,
          type: AirtimeDataTypes.airtime,
        })
        .then((response) => {
          // Send Email
          this.mailService.billTransaction(
            user.email,
            AirtimePaymentType.prepaid,
            body.phone,
            body.amount,
            user.username,
            body.network,
            response.txId,
          );
        })
        .then(async () => {
          this.walletRepsitoryService.changeWalletBalance(userWallet.id, body.amount * 100, WalletAction.deduct);
        });

      return data;
    } catch (e) {
      console.log(e);
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

  public async buyDataPlan(body: PurchaseDataDto, userId: number): Promise<any> {
    try {
      const url = `${this.baseURL}/pay`;
      const requestId = moment().utcOffset('+0100').format('YYYYMMDDHHmm') + this.generateRandomString();
      const user = await this.userRepositoryService.getById(userId);

      const userWallet = await this.walletRepsitoryService.getUserWalletByCurrencyId(userId, NAIRA_CURRENCY_ID);

      if (userWallet.balance < body.amount * 100) {
        return new HttpException(
          'You have Insufficient balance to make continue with this transaction',
          HttpStatus.BAD_REQUEST,
        );
      }

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

      // Log into transactions
      this.transactionRepositoryService
        .createAirtimeDataTransactionHistory({
          txId: this.helperService.generateTransactionId('SPAL_', 8),
          userId: userId,
          amount: Number(data.content.transactions.amount) * 100, // Convert to KOBO
          network: body.network,
          plan: body.variationCode,
          recipient: body.phone,
          billerTxId: data.content.transactions.transactionId,
          status: data.content.transactions.status,
          type: AirtimeDataTypes.data,
        })
        .then((response) => {
          // Send Email
          this.mailService.billTransaction(
            user.email,
            body.variationCode,
            body.phone,
            data.content.transactions.amount,
            user.username,
            body.network,
            response.txId,
          );
        })
        .then(async () => {
          const userWallet = await this.walletRepsitoryService.getUserWalletByCurrencyId(userId, NAIRA_CURRENCY_ID);
          this.walletRepsitoryService.changeWalletBalance(
            userWallet.id,
            Number(data.content.transactions.amount) * 100,
            WalletAction.deduct,
          );
        });

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

  public async payTVBills(body: PurchaseTVSubscriptionDto, userId: number): Promise<any> {
    try {
      const { network, billersCode, amount, phone, variationCode } = body;
      const url = `${this.baseURL}/pay`;
      const requestId = moment().utcOffset('+0100').format('YYYYMMDDHHmm') + this.generateRandomString();
      const user = await this.userRepositoryService.getById(userId);

      const userWallet = await this.walletRepsitoryService.getUserWalletByCurrencyId(userId, NAIRA_CURRENCY_ID);

      if (userWallet.balance < amount * 100) {
        return new HttpException(
          'You have Insufficient balance to make continue with this transaction',
          HttpStatus.BAD_REQUEST,
        );
      }

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

      // Log into transactions
      this.transactionRepositoryService
        .createTvTransactionHistory({
          txId: this.helperService.generateTransactionId('SPAL_', 8),
          userId: userId,
          amount: body.amount * 100, // Convert to KOBO
          network: body.network,
          plan: body.variationCode,
          recipient: body.billersCode,
          billerTxId: data.content.transactions.transactionId,
          status: data.content.transactions.status,
        })
        .then((response) => {
          // Send Email
          this.mailService.billTransaction(
            user.email,
            body.variationCode,
            body.billersCode,
            body.amount,
            user.username,
            body.network,
            response.txId,
          );
        })
        .then(async () => {
          const userWallet = await this.walletRepsitoryService.getUserWalletByCurrencyId(userId, NAIRA_CURRENCY_ID);
          this.walletRepsitoryService.changeWalletBalance(
            userWallet.id,
            Number(body.amount) * 100,
            WalletAction.deduct,
          );
        });

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

  public async payElectricity(body: PurchaseElectricityDto, userId: number): Promise<any> {
    try {
      const { network, billersCode, amount, phone, variationCode } = body;
      const url = `${this.baseURL}/pay`;
      const requestId = moment().utcOffset('+0100').format('YYYYMMDDHHmm') + this.generateRandomString();
      const user = await this.userRepositoryService.getById(userId);

      const userWallet = await this.walletRepsitoryService.getUserWalletByCurrencyId(userId, NAIRA_CURRENCY_ID);

      if (userWallet.balance < amount * 100) {
        return new HttpException(
          'You have Insufficient balance to make continue with this transaction',
          HttpStatus.BAD_REQUEST,
        );
      }

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

      // Log into transactions
      this.transactionRepositoryService
        .createElectricityTransactionHistory({
          txId: this.helperService.generateTransactionId('SPAL_', 8),
          userId: userId,
          amount: body.amount * 100, // Convert to KOBO
          network: body.network,
          plan: body.variationCode.charAt(0).toUpperCase() + body.variationCode.slice(1).toLowerCase(),
          recipient: body.billersCode,
          billerTxId: data.content.transactions.transactionId,
          status: data.content.transactions.status,
        })
        .then((response) => {
          // Send Email
          this.mailService.billTransaction(
            user.email,
            body.variationCode,
            body.billersCode,
            body.amount,
            user.username,
            body.network,
            response.txId,
            data.purchased_code,
          );
        })
        .then(async () => {
          const userWallet = await this.walletRepsitoryService.getUserWalletByCurrencyId(userId, NAIRA_CURRENCY_ID);
          this.walletRepsitoryService.changeWalletBalance(
            userWallet.id,
            Number(body.amount) * 100,
            WalletAction.deduct,
          );
        });

      return data;
    } catch (e) {
      throw new HttpException(e.response.data, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getEducationPlans(network: EducationTypes): Promise<any> {
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

  public async payEducationBills(body: PurchaseEducationDto): Promise<any> {
    try {
      const { network, amount, phone, variationCode } = body;
      const url = `${this.baseURL}/pay`;
      const requestId = moment().format('YYYYMMDDHHmm') + this.generateRandomString();

      const { data } = await firstValueFrom(
        this.httpService.post(
          url,
          {
            request_id: requestId,
            serviceID: network,
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
