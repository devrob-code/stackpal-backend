import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { P2PAccount } from '../entities/p2p-account.entity';

@Injectable()
export class AddNewP2PAccountUseCase {
  constructor(
    @InjectRepository(P2PAccount)
    private readonly p2pAccountRepo: Repository<P2PAccount>,
  ) {}

  public async exec(p2pAccount: Partial<P2PAccount>): Promise<P2PAccount> {
    const newP2PAccount = this.p2pAccountRepo.merge(
      new P2PAccount(),
      p2pAccount,
    );

    return this.p2pAccountRepo.save(newP2PAccount);
  }
}
