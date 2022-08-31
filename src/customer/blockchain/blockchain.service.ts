import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { WalletRepositoryService } from 'src/repositories/wallets/wallet-repository.service';
import { SendCoinDto } from './dto/request/send-coin.dto';
const RippleAPI = require('ripple-lib').RippleAPI;
const CryptoAccount = require('send-crypto');
const NOWNodesApiKey = 'c6c243ff-9a7a-43dd-86d9-1ca9bec25e76';
const totalDecimal: { [key: string]: number } = {
  BTC: 8,
  ETH: 18,
  USDT: 18,
  USDC: 18,
  BNB: 18,
  XRP: 6,
  BCH: 8,
};
let ethereumTxids;
let bitcoinTxids;
let bitcoinCashTxids;

const gasLimit: { [key: string]: number } = {
  BTC: 224,
  ETH: 21000,
  USDT: 70000,
  USDC: 70000,
  BNB: 21000,
  XRP: 1,
  BCH: 0.5,
};

@Injectable()
export class BlockchainService {
  constructor(
    private httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly walletRepositoryService: WalletRepositoryService,
  ) {}

  public async getCoinPrices(): Promise<any> {
    let result = [];
    let tPrices = {};
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
          tPrices[eToken.token] = eRes.market_data.current_price.usd;
        }
      });
    });
    return tPrices;
  }

  public async getXrpBalance(userId: number): Promise<any> {
    const userWallet = await this.walletRepositoryService.getWalletByUserIdAndNetwork(userId, 'ripple');

    try {
      const rippleApi = new RippleAPI({
        //server: 'wss://s.altnet.rippletest.net:51233',
        server: 'wss://s1.ripple.com',
        timeout: 60000,
      });
      var balance = 0;
      const res = await rippleApi
        .connect()
        .then(async () => {
          await rippleApi.getAccountInfo(userWallet.address).then((info: any) => {
            balance = parseFloat(info.xrpBalance);
            console.log(info);
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

  public async getBTCBalance(userId: number): Promise<any> {
    const userWallet = await this.walletRepositoryService.getWalletByUserIdAndNetwork(userId, 'bitcoin');

    try {
      const res = await firstValueFrom(
        this.httpService.post(`https://btcbook.nownodes.io/api/v2/address/${userWallet.address}`, '', {
          headers: { 'api-key': NOWNodesApiKey },
        }),
      )
        .then(async (response) => {
          if (response.data.txids) {
            bitcoinTxids = response.data.txids;
          }
          //return response.data.balance / 10 ** totalDecimal['BTC'];
          response.data.balance = response.data.balance / 10 ** totalDecimal['BTC'];
          return response.data;
        })
        .catch((err) => {
          return 0;
        });
      return res;
    } catch (error) {
      return 0;
    }
  }

  public async getBCHBalance(userId: number): Promise<any> {
    const userWallet = await this.walletRepositoryService.getWalletByUserIdAndNetwork(userId, 'bitcoincash');

    try {
      const res = await firstValueFrom(
        this.httpService.post(`https://bchbook.nownodes.io/api/v2/address/${userWallet.address}`, '', {
          headers: { 'api-key': NOWNodesApiKey },
        }),
      )
        .then(async (response) => {
          if (response.data.txids) {
            bitcoinCashTxids = response.data.txids;
          }

          return response.data;
        })
        .catch((err) => {
          return 0;
        });
      return res;
    } catch (error) {
      return 0;
    }
  }

  public async getERC20Balance(userId: number): Promise<any> {
    const userWallet = await this.walletRepositoryService.getWalletByUserIdAndNetwork(userId, 'ethereum');

    try {
      const res = await firstValueFrom(
        this.httpService.post(`https://eth-blockbook.nownodes.io/api/v2/address/${userWallet.address}`, '', {
          headers: { 'api-key': NOWNodesApiKey },
        }),
      )
        .then(async (response) => {
          var ethCurrentBalance = response.data.balance / 10 ** totalDecimal['ETH'];
          var usdtCurrentBalance = 0;
          var usdcCurrentBalance = 0;

          if (response.data.txids) {
            ethereumTxids = response.data.txids;
          }

          if (response.data.tokens) {
            response.data.tokens.map((eData: any) => {
              if (eData.symbol === 'USDT') {
                usdtCurrentBalance = eData.balance / 10 ** 6;
              } else if (eData.symbol === 'USDC') {
                usdcCurrentBalance = eData.balance / 10 ** 6;
              }
              return true;
            });
          }
          return {
            ETH: ethCurrentBalance,
            USDT: usdtCurrentBalance,
            USDC: usdcCurrentBalance,
          };
        })
        .catch((err) => {
          return {
            ETH: 0,
            USDT: 0,
            USDC: 0,
          };
        });
      return res;
    } catch (error) {
      return 0;
    }
  }

  public async getETHTransactionHistory(userId: number): Promise<any> {
    await this.getERC20Balance(userId);
    let totalHis: any = [];
    const userWallet = await this.walletRepositoryService.getWalletsByUserId(userId);

    if (ethereumTxids) {
      let wallets: { [key: string]: { address: string; privateKey: string } } = {};

      userWallet.map((eData: any) => {
        let networkKey = eData.network;
        wallets[networkKey] = {
          address: eData.address,
          privateKey: eData.private_key,
        };
      });

      try {
        for (const eTxids of ethereumTxids) {
          // `https://ethbook-ropsten.nownodes.io/api/v2/tx/${eTxids}`,

          await firstValueFrom(
            this.httpService.post(
              `https://eth-blockbook.nownodes.io/api/v2/tx/${eTxids}`,
              {},
              {
                headers: { 'api-key': NOWNodesApiKey },
              },
            ),
          )
            .then(async (response) => {
              if (!userWallet) return [];
              var data = {
                scanURL: `https://www.blockchain.com/eth/tx/${response.data.txid}`,
                network: 'Ethereum',
                symbol: response.data.tokenTransfers ? response.data.tokenTransfers[0].symbol : 'ETH',
                blocktime: response.data.blockTime,
                amount: response.data.tokenTransfers
                  ? response.data.tokenTransfers[0].value / 10 ** response.data.tokenTransfers[0].decimals
                  : response.data.value / 10 ** totalDecimal['ETH'],
                fee: response.data.fees / 10 ** totalDecimal['ETH'],
                status:
                  response.data.confirmations > 6
                    ? response.data.tokenTransfers
                      ? response.data.tokenTransfers[0].from === wallets['ethereum'].address
                        ? 'Sent'
                        : 'Received'
                      : response.data.vin[0].addresses[0] === wallets['ethereum'].address
                      ? 'Sent'
                      : 'Received'
                    : 'Pending',
              };

              totalHis.push(data);
            })
            .catch((err) => {
              console.log(err);
              return [];
            });
        }

        return totalHis;
      } catch (error) {
        console.log(error);
        return [];
      }
    } else {
      return [];
    }
  }

  public async getBTCTransactionHistory(userId: number): Promise<any> {
    await this.getBTCBalance(userId);
    const userWallet = await this.walletRepositoryService.getWalletsByUserId(userId);

    if (bitcoinTxids) {
      let wallets: { [key: string]: { address: string; privateKey: string } } = {};

      userWallet.map((eData: any) => {
        let networkKey = eData.network;
        wallets[networkKey] = {
          address: eData.address,
          privateKey: eData.private_key,
        };
      });

      try {
        let totalHis: any = [];
        await Promise.all(
          bitcoinTxids.map(async (eTxids) => {
            await firstValueFrom(
              this.httpService.post(
                `https://btcbook.nownodes.io/api/v2/tx/${eTxids}`,
                {},
                {
                  headers: { 'api-key': NOWNodesApiKey },
                },
              ),
            )
              .then(async (response) => {
                if (!userWallet) return [];
                var value;
                var state;
                response.data.vin.map((eData: any) => {
                  console.log(eData.addresses[0]);
                  if (eData.addresses[0] === wallets['bitcoin'].address) {
                    value = eData.value / 10 ** totalDecimal['BTC'];
                    state = 'Sent';
                  } else {
                    value = eData.value / 10 ** totalDecimal['BTC'];
                    state = 'Received';
                  }
                });
                // response.data.vout.map((eData: any) => {
                //   if (eData.addresses[0] === wallets['bitcoin'].address) {
                //     value = eData.value / 10 ** totalDecimal['BTC'];
                //     state = 'Received';
                //   }
                // });
                var data = {
                  scanURL: `https://www.blockchain.com/btc/tx/${response.data.txid}`,
                  network: 'Bitcoin',
                  symbol: 'BTC',
                  blocktime: response.data.blockTime,
                  amount: value,
                  fee: response.data.fees / 10 ** totalDecimal['BTC'],
                  status: response.data.confirmations >= 3 ? state : 'Pending',
                };
                totalHis.push(data);
              })
              .catch((err) => {
                return [];
              });
          }),
        );
        return totalHis.map((res) => res);
      } catch (error) {
        console.log(error);
        return [];
      }
    } else {
      return [];
    }
  }

  public async getBCHTransactionHistory(userId: number): Promise<any> {
    await this.getBCHBalance(userId);
    const userWallet = await this.walletRepositoryService.getWalletsByUserId(userId);

    if (bitcoinCashTxids) {
      let wallets: { [key: string]: { address: string; privateKey: string } } = {};

      userWallet.map((eData: any) => {
        let networkKey = eData.network;
        wallets[networkKey] = {
          address: eData.address,
          privateKey: eData.private_key,
        };
      });

      try {
        let totalHis: any = [];
        await Promise.all(
          bitcoinCashTxids.map(async (eTxids) => {
            await firstValueFrom(
              this.httpService.post(
                `https://bchbook.nownodes.io/api/v2/tx/${eTxids}`,
                {},
                {
                  headers: { 'api-key': NOWNodesApiKey },
                },
              ),
            )
              .then(async (response) => {
                if (!userWallet) return [];
                var value;
                var state;
                response.data.vin.map((eData: any) => {
                  if (eData.addresses[0] === wallets['bitcoincash'].address) {
                    value = eData.value / 10 ** totalDecimal['BCH'];
                    state = 'Sent';
                  }
                });
                response.data.vout.map((eData: any) => {
                  if (eData.addresses[0] === wallets['bitcoincash'].address) {
                    value = eData.value / 10 ** totalDecimal['BCH'];
                    state = 'Received';
                  }
                });
                var data = {
                  scanURL: `https://www.blockchain.com/bch/tx/${response.data.txid}`,
                  network: 'Bitcoin-Cash',
                  symbol: 'BCH',
                  blocktime: response.data.blockTime,
                  amount: value,
                  fee: response.data.fees / 10 ** totalDecimal['BCH'],
                  status: response.data.confirmations > 3 ? state : 'Pending',
                };
                totalHis.push(data);
              })
              .catch((err) => {
                return [];
              });
          }),
        );
        return totalHis;
      } catch (error) {
        console.log(error);
        return [];
      }
    } else {
      return [];
    }
  }

  public async getXRPTransactionHistory(userId: number): Promise<any> {
    const userWallet = await this.walletRepositoryService.getWalletsByUserId(userId);
    try {
      const rippleApi = new RippleAPI({
        // server: 'wss://s.altnet.rippletest.net:51233',
        server: 'wss://s2.ripple.com',
        timeout: 60000,
      });
      let totalHis: any = [];

      if (userWallet === null) return [];
      let wallets: { [key: string]: { address: string; privateKey: string } } = {};

      userWallet.map((eData: any) => {
        let networkKey = eData.network;
        wallets[networkKey] = {
          address: eData.address,
          privateKey: eData.private_key,
        };
      });
      const history = await rippleApi
        .connect()
        .then(async () => {
          const result = await rippleApi.request('account_tx', {
            id: 2,
            command: 'account_tx',
            account: wallets['ripple'].address ? wallets['ripple'].address : '',
            ledger_index_min: -1,
            ledger_index_max: -1,
            binary: false,
            limit: 5,
            forward: false,
          });
          result.transactions.map((eData: any) => {
            var data = {
              scanURL: `https://bithomp.com/explorer/${eData.tx.hash}`,
              network: 'Ripple',
              symbol: 'XRP',
              blocktime: eData.tx.date + 946684800,
              amount: eData.tx.Amount / 10 ** totalDecimal['XRP'],
              fee: 0.000001,
              status:
                eData.meta.TransactionResult === 'tesSUCCESS'
                  ? eData.tx.Account === wallets['ripple'].address
                    ? 'Sent'
                    : 'Received'
                  : eData.meta.TransactionResult,
            };
            totalHis.push(data);
            return true;
          });
        })
        .then(() => {
          rippleApi.disconnect();
          return totalHis;
        })
        .catch((err: any) => {
          return [];
        });
      return history;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  public async sendBTC(data: SendCoinDto): Promise<any> {
    try {
      let tGasPrice = {};

      const btcFee = await firstValueFrom(this.httpService.get(`https://api.blockcypher.com/v1/btc/main`)).then(
        (res) => res.data,
      );

      tGasPrice['low'] = Math.floor(btcFee.low_fee_per_kb / 1000) + 1;
      tGasPrice['medium'] = Math.floor(btcFee.medium_fee_per_kb / 1000) + 1;
      tGasPrice['high'] = Math.floor(btcFee.high_fee_per_kb / 1000) + 1;

      const userWallet = await this.walletRepositoryService.getWalletsByUserId(data.userId);
      let wallets: { [key: string]: { address: string; privateKey: string } } = {};
      userWallet.map((eData: any) => {
        let networkKey = eData.network;
        wallets[networkKey] = {
          address: eData.address,
          privateKey: eData.private_key,
        };
      });

      const account = new CryptoAccount(wallets ? wallets['bitcoin'].privateKey : '');
      let sendAmount = !isNaN(parseFloat(data.amount)) ? data.amount : '';
      let totalPrices = await this.getCoinPrices();
      // if (!isNaN(parseFloat(data.amount)) && parseFloat(data.amount) > 0) {
      //   sendAmount = (
      //     Math.floor((parseFloat(data.amount) / totalPrices[sendTokenType]) * 100000000) / 100000000
      //   ).toString();
      // }

      //console.log(Math.floor((parseFloat(data.amount) / totalPrices['BTC']) * 100000000) / 100000000);
      await new Promise((resolve, reject) =>
        account
          .send(data.receiver, sendAmount, 'BTC', {
            confirmations: 3,
            fee: tGasPrice[data.sendSpeed] * gasLimit['BTC'],
            subtractFee: false,
          })
          .on('confirmation', (confirmations: any) => {
            console.log(confirmations);
            if (confirmations >= 3) {
              resolve(true);
            }
          })
          .catch(reject),
      );
    } catch (error) {
      console.log(error);
    }
  }

  public async sendETH(data: SendCoinDto): Promise<any> {
    try {
      let tGasPrice = {};
      const ethFee = await firstValueFrom(this.httpService.get(`https://app.bitgo.com/api/v2/eth/tx/fee`)).then(
        (res) => res.data,
      );
      tGasPrice['low'] = parseFloat(ethFee.eip1559.baseFee) + parseFloat(ethFee.eip1559.safeLowMinerTip);
      tGasPrice['medium'] = parseFloat(ethFee.eip1559.baseFee) + parseFloat(ethFee.eip1559.normalMinerTip);
      tGasPrice['high'] = parseFloat(ethFee.eip1559.baseFee) + parseFloat(ethFee.eip1559.fastestMinerTip);

      const userWallet = await this.walletRepositoryService.getWalletsByUserId(data.userId);
      let wallets: { [key: string]: { address: string; privateKey: string } } = {};
      userWallet.map((eData: any) => {
        let networkKey = eData.network;
        wallets[networkKey] = {
          address: eData.address,
          privateKey: eData.private_key,
        };
      });

      const account = new CryptoAccount(wallets ? wallets['ethereum'].privateKey : '');
      let sendAmount = !isNaN(parseFloat(data.amount)) ? data.amount : '';
      await new Promise((resolve, reject) =>
        account
          .send(data.receiver, parseFloat(sendAmount), 'ETH', {
            gas: gasLimit['ETH'],
            gasPrice: tGasPrice[data.sendSpeed],
          })
          .on('confirmation', (confirmations: any) => {
            console.log(confirmations);
            if (confirmations >= 3) {
              resolve(true);
            }
          })
          .catch(reject),
      );
    } catch (error) {
      alert(error);
    }
  }
}
