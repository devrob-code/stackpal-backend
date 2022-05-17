import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from '../entities/wallet.entity';

@Injectable()
export class CreateUserWalletUseCase {
  constructor(
    @InjectRepository(Wallet) private readonly walletRepo: Repository<Wallet>,
  ) {}

  public async exec(wallet: Partial<Wallet>): Promise<Wallet> {
    const newWallet = this.walletRepo.merge(new Wallet(), wallet);

    return this.walletRepo.save(newWallet);
  }
}
