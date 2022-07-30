import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/request/create-user.dto';
import { User } from './entities/user.entity';
import { CreateUserUseCase } from './usecases/create-user.usecase';
import { CreateUserWalletUseCase } from '../wallets/usecases/create-user-wallet.usecase';
import { GetUserByPhoneUseCase } from './usecases/get-user-by-phone.usecase';
import { GetUserByEmailAndIdUseCase } from './usecases/get-user-by-email-and-id.usecase';
import { GetUserByEmailUseCase } from './usecases/get-user-by-email.usecase';
import { GetUserByUsernameUseCase } from './usecases/get-user-by-username.usecase';
import { UpdateUserByEmailUseCase } from './usecases/update-user-by-email.usecase';
import { GetIdByUserDataUsecase } from './usecases/get-user-id-by-user-data.usecase';
import {
  Keypair,
} from "@solana/web3.js";
import * as bs58 from "bs58";
const Web3 = require("web3"); //eth
const BCHJS = require('@psf/bch-js')
const BchWallet = require('minimal-slp-wallet/index')
const RippleAPI  = require('ripple-lib').RippleAPI
const moneroWallet = require('monero-nodejs');
const monerojs = require("monero-javascript");

@Injectable()
export class UserRepositoryService {
  constructor(
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
    private readonly getUserByUsernameUseCase: GetUserByUsernameUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly createUserWalletUseCase: CreateUserWalletUseCase,
    private readonly getUserByEmailAndIdUseCase: GetUserByEmailAndIdUseCase,
    private readonly updateUserByEmailUseCase: UpdateUserByEmailUseCase,
    private readonly getUserByPhoneUseCase: GetUserByPhoneUseCase,
    private readonly getIdByUserDataUsecase: GetIdByUserDataUsecase,
  ) {}

  public async getByEmail(email: string): Promise<User> {
    return this.getUserByEmailUseCase.exec(email);
  }

  public async getByUsername(username: string): Promise<User> {
    return this.getUserByUsernameUseCase.exec(username);
  }

  public async getByPhone(phone: string): Promise<User> {
    return this.getUserByPhoneUseCase.exec(phone);
  }

  public async createUser(body: CreateUserDto): Promise<User> {
    const createdUser = await this.createUserUseCase.exec(body);

    const ethereumWallet = await this.createEthereumWallet(); //ethereum wallet
    const bitcoinWallet = await this.createBitcoinWallet(); //bitcoin wallet
    const rippleWallet = await this.createRippleWallet(); //ripple wallet
    const binanceWallet = await this.createBinanceWallet(); //binace wallet
    const bitcoincashWallet = await this.createBitcoinCashWallet(); //bitcoin cash wallet
    const moneroWallet = await this.createMoneroWallet(); //monero wallet

    const walletData = [ethereumWallet, bitcoinWallet, rippleWallet, binanceWallet, bitcoincashWallet, moneroWallet];

    walletData.map(eData => {
      const createWalletData = {
        userId: createdUser.id,
        currencyId: 1,
        balance:0,
        isLocked:true,
        network: eData.network,
        address: eData.address,
        private_key: eData.privateKey
      }
      this.createUserWalletUseCase.exec(createWalletData);
    });
    return createdUser;
  }

  public async getByEmailAndId(email: string, id: number): Promise<User> {
    return this.getUserByEmailAndIdUseCase.exec(email, id);
  }

  public async updateUserByEmail(
    email: string,
    data: Partial<User>,
  ): Promise<boolean> {
    return this.updateUserByEmailUseCase.exec(email, data);
  }

  public async getIdByUserData(userData: string): Promise<number> {
    return this.getIdByUserDataUsecase.exec(userData);
  }

  private async createEthereumWallet(): Promise<any> {

    const RpcUrl = process.env.ETHEREUM_RPC;
    const web3 = new Web3(new Web3.providers.HttpProvider(RpcUrl));   //eth
    const account = web3.eth.accounts.create();
    return {
      network: "ethereum",
      address: account.address,
      privateKey: account.privateKey
    }
  }

  private async createBitcoinWallet(): Promise<any> {

    const CoinKey = require('coinkey');  //btc
    const btcWallet = new CoinKey.createRandom();

    return {
      network: "bitcoin",
      address: btcWallet.publicAddress,
      privateKey: btcWallet.privateKey.toString('hex')
    }
  }

  private async createSolanaWallet(): Promise<any> {

    const keypair = Keypair.generate();
    const firstWinPrivKey = keypair.secretKey.slice(0, 32);
    const firstWinWallet = Keypair.fromSeed(Uint8Array.from(firstWinPrivKey));
    // setSolPrivateKey(bs58.encode(firstWinWallet.secretKey));
    // setSolWalletAddress((firstWinWallet.publicKey).toString());

    return {
      network: "solana",
      address: firstWinWallet.publicKey.toString(),
      privateKey: firstWinWallet.secretKey
    }
  }

  private async createRippleWallet(): Promise<any> {
    const api = new RippleAPI()
    const account = api.generateAddress()
    return {
      network: "ripple",
      address: account.address,
      privateKey: account.secret
    }
  }

  private async createBinanceWallet(): Promise<any> {

    const RpcUrl = process.env.BINANCE_RPC;
    const web3 = new Web3(new Web3.providers.HttpProvider(RpcUrl));   //eth
    const account = web3.eth.accounts.create();
    return {
      network: "binance",
      address: account.address,
      privateKey: account.privateKey
    }
  }

  private async createBitcoinCashWallet(): Promise<any> {

    const bchWallet = new BchWallet()
    await bchWallet.walletInfoPromise // Wait for wallet to be created.

    // // 12 words seed phrase for the wallet
    // console.log(bchWallet.walletInfo.mnemonic)

    // // cash address derived from the seed (derivation path: m/44'/245'/0'/0/0)
    // console.log(bchWallet.walletInfo.cashAddress)

    // // legacy address derived from the seed (derivation path: m/44'/245'/0'/0/0)
    // console.log(bchWallet.walletInfo.legacyAddress)

    // // private key for the BCH address derived from the seed (derivation path: m/44'/245'/0'/0/0)
    // console.log(bchWallet.walletInfo.privateKey)
    return {
      network: "bitcoincash",
      address: bchWallet.walletInfo.cashAddress,
      privateKey: bchWallet.walletInfo.mnemonic
    }
  }

  private async createMoneroWallet():Promise<any> {
    return {
      network: "monero",
      address: "44d56JdhVgYLjcnfYRtBgEaQnfbtr6Ns65H2J3rr7F4DDfcTMrpNoNWQgzsN74e6NeU1roX2GrMLchEzLt2dX1B2Qhuhr2P",
      privateKey: "41fd8b839b386a0f8f97046884056717a118b8164ad795303c50dbcb39123209"
    }
  }
}
