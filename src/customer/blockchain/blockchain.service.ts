import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { WalletRepositoryService } from 'src/repositories/wallets/wallet-repository.service';
const RippleAPI = require('ripple-lib').RippleAPI;

@Injectable()
export class BlockchainService {
  constructor(
    private httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly walletRepositoryService: WalletRepositoryService,
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

  public async getXrpBalance(userId: number): Promise<any> {
    const userWallet =
      await this.walletRepositoryService.getWalletByUserIdAndNetwork(
        userId,
        'ripple',
      );

    try {
      const rippleApi = new RippleAPI({
        // server: 'wss://s.altnet.rippletest.net:51233',
        server: 'wss://s1.ripple.com',
      });
      var balance = 0;
      const res = await rippleApi
        .connect()
        .then(async () => {
          await rippleApi
            .getAccountInfo(userWallet.address)
            .then((info: any) => {
              balance = parseFloat(info.xrpBalance);
            });
        })
        .then(() => {
          rippleApi.disconnect();
          return balance;
        })
        .catch((err: any) => {
          return 0;
        });
      return res;
    } catch (error) {
      return 0;
    }
  }
}
