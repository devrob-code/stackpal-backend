import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { P2PAccount } from '../entities/p2p-account.entity';
import { P2PAccountResponse } from '../response/p2p-account.response';

@Injectable()
export class GetP2PAccountsUseCase {
  constructor(
    @InjectRepository(P2PAccount)
    private readonly p2pAccountRepo: Repository<P2PAccount>,
  ) {}

  public async exec(): Promise<P2PAccountResponse[]> {
    return this.p2pAccountRepo.find({
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }
}
