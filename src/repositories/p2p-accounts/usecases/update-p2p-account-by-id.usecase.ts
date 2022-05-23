import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { P2PAccount } from '../entities/p2p-account.entity';
@Injectable()
export class UpdateP2PAccountByIdUseCase {
  constructor(
    @InjectRepository(P2PAccount)
    private readonly p2pAccountRepo: Repository<P2PAccount>,
  ) {}

  public async exec(id, body): Promise<boolean> {
    const updateP2PAccount = this.p2pAccountRepo
      .createQueryBuilder()
      .update('p2pAccounts')
      .set(body)
      .where('id = :id', { id })
      .execute();

    return !!updateP2PAccount;
  }
}
