import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { MailService } from 'src/core/mail/mail.service';
import { CurrencyRepositoryService } from 'src/repositories/currencies/currency-repository.service';
import { UserRepositoryService } from 'src/repositories/users/user-repository.service';
import { WalletRepositoryService } from 'src/repositories/wallets/wallet-repository.service';
import { WalletAction } from '../wallet/wallet.constants';
import { AdminBuyCoinDto } from './dto/request/admin-buy-coin.dto';
import { SendCoinDto } from './dto/request/send-coin.dto';
const RippleAPI = require('ripple-lib').RippleAPI;
const CryptoAccount = require('send-crypto');
const BchWallet = require('minimal-bch-wallet/index');
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
    private readonly currencyRepositoryService: CurrencyRepositoryService,
    private readonly mailService: MailService,
    private readonly userRepositoryService: UserRepositoryService,
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
    try {
      const baseURL = this.configService.get('coingecko.baseUrl');
      const url = `${baseURL}/coins`;
      const { data } = await firstValueFrom(
        this.httpService.get(url, { headers: { 'Accept-Encoding': 'gzip,deflate,compress' } }),
      );

      //return data;
      data.map((eRes: any) => {
        tokens.map((eToken) => {
          if (eToken.token.toLowerCase() === eRes.symbol) {
            tPrices[eToken.token] = eRes.market_data.current_price.usd;
          }
        });
      });
      return tPrices;
    } catch (e) {
      console.log(e.message);
    }
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
          console.log(err);
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
          console.log(err);
          return 0;
        });
      return res;
    } catch (error) {
      return 0;
    }
  }

  public async getBCHBalance(userId: number): Promise<any> {
    const userWallet = await this.walletRepositoryService.getWalletByUserIdAndNetwork(userId, 'bitcoincash');
    //const simpleWallet = new SimpleWallet(userWallet.mnemonic);

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

          return response.data.balance / 10 ** totalDecimal['BCH'];
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
          console.log(err);
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

  public async getNGNBalance(userId: number): Promise<any> {
    const currency = await this.currencyRepositoryService.getByCurrencyAlias('NGN');
    const wallet = await this.walletRepositoryService.getUserWalletByCurrencyId(userId, currency.id);
    return { balance: Number(wallet.balance) };
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
      const result = await account
        .send(data.receiver, sendAmount, 'BTC', {
          confirmations: 3,
          fee: tGasPrice[data.sendSpeed] * gasLimit['BTC'],
          subtractFee: false,
        })
        .on('transactionHash', console.log)
        .on('confirmation', console.log);

      if (result) {
        return { status: true };
      }
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
      const result = await account
        .send(data.receiver, parseFloat(sendAmount), 'ETH', {
          gas: gasLimit['ETH'],
          gasPrice: tGasPrice[data.sendSpeed],
        })
        .on('transactionHash', console.log)
        .on('confirmation', console.log);

      if (result) {
        return { status: true };
      }
    } catch (error) {
      console.log(error);
      return { status: false, message: 'Error. Try again later.' };
    }
  }

  public async sendBCH(data: SendCoinDto): Promise<any> {
    try {
      let tGasPrice = {};

      const bchFee = await firstValueFrom(this.httpService.get(`https://app.bitgo.com/api/v2/bch/tx/fee`)).then(
        (res) => res.data,
      );

      tGasPrice['low'] = bchFee.feePerKb;
      tGasPrice['medium'] = bchFee.feePerKb;
      tGasPrice['high'] = bchFee.feePerKb;

      const userWallet = await this.walletRepositoryService.getWalletsByUserId(data.userId);
      let wallets: { [key: string]: { address: string; privateKey: string } } = {};
      userWallet.map((eData: any) => {
        let networkKey = eData.network;
        wallets[networkKey] = {
          address: eData.address,
          privateKey: eData.private_key,
        };
      });

      console.log(wallets ? wallets['bitcoincash'].privateKey : '');

      //return;

      const account = new CryptoAccount('xbGotygnqWj7A63nFw5mi1BELFvh3Y7s69jVpjEofaija1bAHVC');

      let sendAmount = !isNaN(parseFloat(data.amount)) ? data.amount : '';
      let totalPrices = await this.getCoinPrices();
      // if (!isNaN(parseFloat(data.amount)) && parseFloat(data.amount) > 0) {
      //   sendAmount = (
      //     Math.floor((parseFloat(data.amount) / totalPrices[sendTokenType]) * 100000000) / 100000000
      //   ).toString();
      // }

      //console.log(Math.floor((parseFloat(data.amount) / totalPrices['BTC']) * 100000000) / 100000000);
      const result = await account
        .send(data.receiver, sendAmount, 'BCH', {
          confirmations: 3,
          fee: tGasPrice[data.sendSpeed] * gasLimit['BCH'],
          subtractFee: false,
        })
        .on('transactionHash', console.log)
        .on('confirmation', console.log);

      if (result) {
        return { status: true };
      }
    } catch (error) {
      console.log(error);
    }
    // try {
    //   const userWallet = await this.walletRepositoryService.getWalletsByUserId(data.userId);
    //   let wallets: { [key: string]: { address: string; privateKey: string } } = {};
    //   userWallet.map((eData: any) => {
    //     let networkKey = eData.network;
    //     wallets[networkKey] = {
    //       address: eData.address,
    //       privateKey: eData.private_key,
    //     };
    //   });
    //   if (!wallets) return;
    //   const RECEIVER = data.receiver;
    //   const SATS_TO_SEND = parseFloat(data.amount) * totalDecimal['BCH'];
    //   const bchWallet = new BchWallet(wallets['bitcoincash'].privateKey);
    //   await bchWallet.walletInfoPromise;
    //   const balance = await bchWallet.getBalance();
    //   if (balance === 0) {
    //     return { status: false, message: 'The balance of your wallet is zero.' };
    //   }
    //   const outputs = [];
    //   outputs.push({
    //     address: RECEIVER,
    //     amountSat: SATS_TO_SEND,
    //   });
    //   const result = await bchWallet.send(outputs);
    //   return result;
    // } catch (error) {
    //   console.log(error);
    //   return { status: false, message: 'Error. Try again later.' };
    // }
  }

  public async sendUSDC(data: SendCoinDto): Promise<any> {
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
      const result = await account
        .send(
          data.receiver,
          parseFloat(data.amount),
          {
            type: 'ERC20',
            name: 'USDC',
          },
          {
            gas: gasLimit['USDC'],
            gasPrice: tGasPrice[data.sendSpeed],
          },
        )
        .on('transactionHash', console.log)
        .on('confirmation', console.log);

      if (result) {
        return { status: true };
      }
    } catch (error) {
      console.log(error);
      return { status: false, message: 'Error. Try again later.' };
    }
  }

  public async sendUSDT(data: SendCoinDto): Promise<any> {
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
      const result = await account
        .send(
          data.receiver,
          parseFloat(data.amount),
          {
            type: 'ERC20',
            name: 'USDT',
          },
          {
            gas: gasLimit['USDT'],
            gasPrice: tGasPrice[data.sendSpeed],
          },
        )
        .on('transactionHash', console.log)
        .on('confirmation', console.log);

      if (result) {
        return { status: true };
      }
    } catch (error) {
      console.log(error);
      return { status: false, message: 'Error. Try again later.' };
    }
  }

  public async sendXRP(data: SendCoinDto): Promise<any> {
    const rippleApi = new RippleAPI({
      // server: 'wss://s.altnet.rippletest.net:51233',
      server: 'wss://s2.ripple.com',
      timeout: 60000,
    });

    const userWallet = await this.walletRepositoryService.getWalletsByUserId(data.userId);
    let wallets: { [key: string]: { address: string; privateKey: string } } = {};
    userWallet.map((eData: any) => {
      let networkKey = eData.network;
      wallets[networkKey] = {
        address: eData.address,
        privateKey: eData.private_key,
      };
    });

    // SEND ADDRESS 1
    const ADDRESS_1 = wallets ? wallets['ripple'].address : '';
    const SECRET_1 = 'saUkuF7vDWDi7zj1xkekYsrF6cGb3'; //wallets ? wallets['ripple'].privateKey : '';

    // RECEIVE ADDRESS 2
    const ADDRESS_2 = data.receiver;
    const instructions = { maxLedgerVersionOffset: 5 };
    const currency = 'XRP';
    const amount = data.amount;

    const payment = {
      source: {
        address: ADDRESS_1,
        maxAmount: {
          value: amount,
          currency: currency,
        },
      },
      destination: {
        address: ADDRESS_2,
        amount: {
          value: amount,
          currency: currency,
        },
      },
    };

    try {
      await new Promise((resolve, reject) =>
        rippleApi
          .connect()
          .then(() => {
            console.log('Connected...');
            rippleApi.preparePayment(ADDRESS_1, payment, instructions).then((prepared: any) => {
              const { signedTransaction } = rippleApi.sign(prepared.txJSON, SECRET_1);
              rippleApi.submit(signedTransaction).then((result: any) => {
                console.log(result);
                rippleApi.disconnect();
              });
            });
          })
          .then(() => {
            console.log('d');
            //rippleApi.disconnect();
          })
          .catch(reject),
      );
    } catch (error) {
      alert(error);
    }
  }

  public async getUsdRate() {
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
    try {
      const baseURL = this.configService.get('coingecko.baseUrl');
      const url = `${baseURL}/coins`;
      const { data } = await firstValueFrom(
        this.httpService.get(url, { headers: { 'Accept-Encoding': 'gzip,deflate,compress' } }),
      );

      //return data;
      data.map((eRes: any) => {
        tokens.map((eToken) => {
          if (eToken.token.toLowerCase() === eRes.symbol) {
            tPrices[eToken.token] = eRes.market_data.current_price.usd;
          }

          if (eRes.symbol === 'usdt') {
            tPrices['rate'] = eRes.market_data.current_price.ngn + 284;
          }
        });
      });
      return tPrices;
    } catch (e) {
      console.log(e.message);
    }
  }

  public async getOnlyUsdRate() {
    let price;
    const tokens = [{ token: 'USDT', network: 'ethereum' }];
    try {
      const baseURL = this.configService.get('coingecko.baseUrl');
      const url = `${baseURL}/coins`;

      const { data } = await firstValueFrom(
        this.httpService.get(url, { headers: { 'Accept-Encoding': 'gzip,deflate,compress' } }),
      );

      //return data;
      data.map((eRes: any) => {
        tokens.map((eToken) => {
          if (eToken.token.toLowerCase() === eRes.symbol) {
            price = eRes.market_data.current_price.ngn + 284;
          }
        });
      });

      return price;
    } catch (e) {
      console.log(e.message);
    }
  }

  public async dashboardBalances(userId: number) {
    const ngnBalance: any = await this.getNGNBalance(userId);
    const btcBalance: any = await this.getBTCBalance(userId);
    //const bchBalance = await this.getBCHBalance(userId);
    const erc20Balance: any = await this.getERC20Balance(userId);
    const coinsDollarPrices: any = await this.getCoinPrices();
    const usdRate = await this.getOnlyUsdRate();

    const balances = Promise.all([ngnBalance, btcBalance, erc20Balance, usdRate, coinsDollarPrices]).then((values) => {
      return {
        ngnBalance: ngnBalance.balance.toString(),
        btcBalance: btcBalance.balance.toString(),
        ethBalance: erc20Balance.ETH.toString(),
        usdtBalance: erc20Balance.USDT.toString(),
        usdcBalance: erc20Balance.USDC.toString(),
        usd: usdRate.toString(),
        coinsDollarPrices,
      };
    });

    return balances;
  }

  public async adminSendBTC(receiverId: number, body: AdminBuyCoinDto) {
    try {
      let tGasPrice = {};
      const user = await this.userRepositoryService.getById(receiverId);

      const btcFee = await firstValueFrom(this.httpService.get(`https://api.blockcypher.com/v1/btc/main`)).then(
        (res) => res.data,
      );

      tGasPrice['low'] = Math.floor(btcFee.low_fee_per_kb / 1000) + 1;
      tGasPrice['medium'] = Math.floor(btcFee.medium_fee_per_kb / 1000) + 1;
      tGasPrice['high'] = Math.floor(btcFee.high_fee_per_kb / 1000) + 1;

      const userWallet = await this.walletRepositoryService.getWalletsByUserId(16);
      const receiverWallet = await this.walletRepositoryService.getWalletsByUserId(receiverId);
      let wallets: { [key: string]: { address: string; privateKey: string } } = {};
      let receiverWallets: { [key: string]: { address: string; privateKey: string } } = {};
      userWallet.map((eData: any) => {
        let networkKey = eData.network;
        wallets[networkKey] = {
          address: eData.address,
          privateKey: eData.private_key,
        };
      });

      receiverWallet.map((eData) => {
        let networkKey = eData.network;
        receiverWallets[networkKey] = {
          address: eData.address,
          privateKey: eData.private_key,
        };

        if (eData.currencyId == 3) {
          let amountToDeduct = parseInt(body.naira);
          this.walletRepositoryService.changeWalletBalance(eData.id, amountToDeduct, WalletAction.deduct);
        }
      });

      const account = new CryptoAccount(wallets ? wallets['bitcoin'].privateKey : '');
      let sendAmount = !isNaN(parseFloat(body.amount)) ? body.amount : '';

      //let totalPrices = await this.getCoinPrices();
      // if (!isNaN(parseFloat(data.amount)) && parseFloat(data.amount) > 0) {
      //   sendAmount = (
      //     Math.floor((parseFloat(data.amount) / totalPrices[sendTokenType]) * 100000000) / 100000000
      //   ).toString();
      // }

      //console.log(Math.floor((parseFloat(data.amount) / totalPrices['BTC']) * 100000000) / 100000000);
      const result = await account
        .send(receiverWallets['bitcoin'].address, sendAmount, 'BTC', {
          confirmations: 3,
          fee: tGasPrice['low'] * gasLimit['BTC'],
          subtractFee: false,
        })
        .on('transactionHash', console.log)
        .on('confirmation', console.log);

      if (result) {
        // Send Email Notification
        this.mailService.buyCoin(user.email, body.coin, body.naira, body.amount, user.username);

        return { status: true };
      } else {
        return { status: false };
      }
    } catch (error) {
      console.log(error);
      return { status: false };
    }
  }

  public async adminSendETH(receiverId: number, body: AdminBuyCoinDto): Promise<any> {
    try {
      let tGasPrice = {};
      const ethFee = await firstValueFrom(this.httpService.get(`https://app.bitgo.com/api/v2/eth/tx/fee`)).then(
        (res) => res.data,
      );
      tGasPrice['low'] = parseFloat(ethFee.eip1559.baseFee) + parseFloat(ethFee.eip1559.safeLowMinerTip);
      tGasPrice['medium'] = parseFloat(ethFee.eip1559.baseFee) + parseFloat(ethFee.eip1559.normalMinerTip);
      tGasPrice['high'] = parseFloat(ethFee.eip1559.baseFee) + parseFloat(ethFee.eip1559.fastestMinerTip);

      const user = await this.userRepositoryService.getById(receiverId);
      const userWallet = await this.walletRepositoryService.getWalletsByUserId(16);
      const receiverWallet = await this.walletRepositoryService.getWalletsByUserId(receiverId);
      let wallets: { [key: string]: { address: string; privateKey: string } } = {};
      let receiverWallets: { [key: string]: { address: string; privateKey: string } } = {};
      userWallet.map((eData: any) => {
        let networkKey = eData.network;
        wallets[networkKey] = {
          address: eData.address,
          privateKey: eData.private_key,
        };
      });

      receiverWallet.map((eData) => {
        let networkKey = eData.network;
        receiverWallets[networkKey] = {
          address: eData.address,
          privateKey: eData.private_key,
        };

        if (eData.currencyId == 3) {
          let amountToDeduct = parseInt(body.naira);
          this.walletRepositoryService.changeWalletBalance(eData.id, amountToDeduct, WalletAction.deduct);
        }
      });

      const account = new CryptoAccount(wallets ? wallets['ethereum'].privateKey : '');
      let sendAmount = !isNaN(parseFloat(body.amount)) ? body.amount : '';
      const result = await account
        .send(receiverWallets['ethereum'].address, parseFloat(sendAmount), 'ETH', {
          gas: gasLimit['ETH'],
          gasPrice: tGasPrice['low'],
        })
        .on('transactionHash', console.log)
        .on('confirmation', console.log);

      if (result) {
        // Send Email Notifications
        this.mailService.buyCoin(user.email, body.coin, body.naira, body.amount, user.username);
        return { status: true };
      }
    } catch (error) {
      console.log(error);
      return { status: false, message: 'Error. Try again later.' };
    }
  }
}
