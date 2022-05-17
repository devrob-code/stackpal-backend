import { Injectable } from '@nestjs/common';
import { NewP2PAccountDto } from 'src/admin/p2p-accounts/dto/request/new-p2p-account.dto';
import { P2PAccount } from './entities/p2p-account.entity';
import { AddNewP2PAccountUseCase } from './usecases/add-new-p2p-account.usecase';

@Injectable()
export class P2PAccountRepositoryService {
  constructor(
    private readonly addNewP2PAccountUseCase: AddNewP2PAccountUseCase,
  ) {}

  public async addNewP2PAccount(body: NewP2PAccountDto): Promise<P2PAccount> {
    return this.addNewP2PAccountUseCase.exec(body);
  }
}
