import { Injectable } from '@nestjs/common';
import { P2PAccount } from 'src/repositories/p2p-accounts/entities/p2p-account.entity';
import { P2PAccountRepositoryService } from 'src/repositories/p2p-accounts/p2p-account-repository.service';
import { NewP2PAccountDto } from './dto/request/new-p2p-account.dto';

@Injectable()
export class AdminP2PAccountService {
  constructor(
    private readonly p2pAccountRepositoryService: P2PAccountRepositoryService,
  ) {}

  public async addNewP2PAccount(body: NewP2PAccountDto): Promise<P2PAccount> {
    return await this.p2pAccountRepositoryService.addNewP2PAccount(body);
  }
}
