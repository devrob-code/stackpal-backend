import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from '../entities/wallet.entity';

@Injectable()
export class GetByCurrencyIdAndUserIdUseCase {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepo: Repository<Wallet>,
  ) {}

  public async exec(currencyId: number, userId: number): Promise<Wallet> {
    return await this.walletRepo.findOne({
      where: {
        currencyId,
        userId,
      },
      relations: ['currency'],
    });
  }
}
