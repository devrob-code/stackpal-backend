import { Injectable } from '@nestjs/common';
import { GetAllBanksUseCase } from './usecases/get-all-banks.usecase';
import { BankAccountsResponse, BanksResponse } from 'src/customer/banks/dto/response/banks.response';
import { GetUserBankAccountsUseCase } from './usecases/get-user-bank-accounts.usecase';
import { SaveBankAccountDto } from 'src/customer/banks/dto/request/save-bank-account.dto';
import { AddNewBankAccountUseCase } from './usecases/add-new-bank-account.usecase';
import { DeleteBankAccountByUserIdAndIdUseCase } from './usecases/delete-bank-account-by-user-id-and-id.usecase';

@Injectable()
export class BankRepositoryService {
  constructor(
    private readonly getAllBanksUseCase: GetAllBanksUseCase,
    private readonly getUserBankAccountsUseCase: GetUserBankAccountsUseCase,
    private readonly addNewBankAccountUseCase: AddNewBankAccountUseCase,
    private readonly deleteBankAccountByUserIdAndIdUseCase: DeleteBankAccountByUserIdAndIdUseCase,
  ) {}

  public async getAllBanks(): Promise<BanksResponse[]> {
    return await this.getAllBanksUseCase.exec();
  }

  public async getUserBankAccounts(userId: number): Promise<BankAccountsResponse[]> {
    return await this.getUserBankAccountsUseCase.exec(userId);
  }

  public async addNewBankAccount(data: SaveBankAccountDto, userId: number): Promise<any> {
    return await this.addNewBankAccountUseCase.exec(data, userId);
  }

  public async deleteBankAccountByUserIdAndId(bankAccountId: number, userId: number): Promise<any> {
    return await this.deleteBankAccountByUserIdAndIdUseCase.exec(bankAccountId, userId);
  }
}
