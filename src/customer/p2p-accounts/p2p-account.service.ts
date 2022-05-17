import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { P2PAccountRepositoryService } from 'src/repositories/p2p-accounts/p2p-account-repository.service';
import { P2PAccountResponse } from 'src/repositories/p2p-accounts/response/p2p-account.response';

@Injectable()
export class P2PAccountService {
  constructor(
    private readonly p2pAccountRepositoryService: P2PAccountRepositoryService,
  ) {}

  public async getP2PAccountById(id: number): Promise<P2PAccountResponse> {
    const p2pAccount = await this.p2pAccountRepositoryService.getP2PAccountById(
      id,
    );

    return plainToInstance(P2PAccountResponse, p2pAccount);
  }
}
