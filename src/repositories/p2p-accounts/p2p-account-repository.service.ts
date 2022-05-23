import { Injectable } from '@nestjs/common';
import { NewP2PAccountDto } from 'src/admin/p2p-accounts/dto/request/new-p2p-account.dto';
import { P2PAccountResponse } from 'src/repositories/p2p-accounts/response/p2p-account.response';
import { AddNewP2PAccountUseCase } from './usecases/add-new-p2p-account.usecase';
import { GetP2PAccountByIdUseCase } from './usecases/get-p2p-account-by-id.usecase';
import { GetP2PAccountsUseCase } from './usecases/get-p2p-accounts.usecase';
import { GetRandomP2PAccountUseCase } from './usecases/get-random-p2p-account.usecase';
import { UpdateP2PAccountByIdUseCase } from './usecases/update-p2p-account-by-id.usecase';

@Injectable()
export class P2PAccountRepositoryService {
  constructor(
    private readonly addNewP2PAccountUseCase: AddNewP2PAccountUseCase,
    private readonly getP2PAccountByIdUseCase: GetP2PAccountByIdUseCase,
    private readonly getP2PAccountsUseCase: GetP2PAccountsUseCase,
    private readonly getRandomP2PAccountUseCase: GetRandomP2PAccountUseCase,
    private readonly updateP2PAccountByIdUseCase: UpdateP2PAccountByIdUseCase,
  ) {}

  public async addNewP2PAccount(
    body: NewP2PAccountDto,
  ): Promise<P2PAccountResponse> {
    return this.addNewP2PAccountUseCase.exec(body);
  }

  public async getP2PAccountById(id: number): Promise<P2PAccountResponse> {
    return this.getP2PAccountByIdUseCase.exec(id);
  }

  public async getP2PAccounts(): Promise<P2PAccountResponse[]> {
    return this.getP2PAccountsUseCase.exec();
  }

  public async getRandomP2PAccount(): Promise<P2PAccountResponse> {
    return this.getRandomP2PAccountUseCase.exec();
  }

  public async updateP2PAccount(id: number, body): Promise<boolean> {
    return this.updateP2PAccountByIdUseCase.exec(id, body);
  }
}
