import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { P2PAccountRepositoryService } from 'src/repositories/p2p-accounts/p2p-account-repository.service';
import { P2PAccountResponse } from 'src/repositories/p2p-accounts/response/p2p-account.response';
import { NewP2PAccountDto } from './dto/request/new-p2p-account.dto';

@Injectable()
export class AdminP2PAccountService {
  constructor(
    private readonly p2pAccountRepositoryService: P2PAccountRepositoryService,
  ) {}

  public async addNewP2PAccount(
    body: NewP2PAccountDto,
  ): Promise<P2PAccountResponse> {
    const newP2PAccount =
      await this.p2pAccountRepositoryService.addNewP2PAccount(body);
    return plainToInstance(P2PAccountResponse, newP2PAccount);
  }

  public async changeAccountStatus(
    id: number,
    deactivate: boolean,
  ): Promise<boolean> {
    return this.p2pAccountRepositoryService.updateP2PAccount(id, {
      isActive: deactivate,
    });
  }
}
