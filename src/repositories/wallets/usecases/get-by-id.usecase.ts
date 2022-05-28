import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from '../entities/wallet.entity';

@Injectable()
export class GetByIdUseCase {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepo: Repository<Wallet>,
  ) {}

  public async exec(id: number): Promise<Wallet> {
    return await this.walletRepo.findOne({
      where: {
        id,
      },
      relations: ['currency'],
    });
  }
}
