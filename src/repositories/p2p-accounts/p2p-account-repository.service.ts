import { Injectable } from '@nestjs/common';
import { NewP2PAccountDto } from 'src/admin/p2p-accounts/dto/request/new-p2p-account.dto';
import { P2PAccountResponse } from 'src/admin/p2p-accounts/dto/response/p2p-account.response';
import { AddNewP2PAccountUseCase } from './usecases/add-new-p2p-account.usecase';

@Injectable()
export class P2PAccountRepositoryService {
  constructor(
    private readonly addNewP2PAccountUseCase: AddNewP2PAccountUseCase,
  ) {}

  public async addNewP2PAccount(
    body: NewP2PAccountDto,
  ): Promise<P2PAccountResponse> {
    return this.addNewP2PAccountUseCase.exec(body);
  }
}
