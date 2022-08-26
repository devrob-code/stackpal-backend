import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class BlockchainService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  public async getCoinPrices(): Promise<any> {
    let result = [];
    const tokens = [
      { token: 'BTC', network: 'bitcoin' },
      { token: 'ETH', network: 'ethereum' },
      { token: 'USDT', network: 'ethereum' },
      { token: 'USDC', network: 'ethereum' },
      // {token: "BNB", network: "binance"},
      { token: 'XRP', network: 'ripple' },
      { token: 'BCH', network: 'bitcoincash' },
    ];

    const baseURL = this.configService.get('coingecko.baseUrl');
    const url = `${baseURL}/coins`;
    const { data } = await firstValueFrom(this.httpService.get(url));

    data.map((eRes: any) => {
      tokens.map((eToken) => {
        if (eToken.token.toLowerCase() === eRes.symbol) {
          result.push(eRes);
        }
      });
    });
    return result;
  }
}
