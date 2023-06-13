import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BankAccounts } from '../entities/bank-account.entity';
import { BankAccountsResponse } from 'src/customer/banks/dto/response/banks.response';

@Injectable()
export class GetUserBankAccountsUseCase {
  constructor(
    @InjectRepository(BankAccounts)
    private readonly bankAccountsRepo: Repository<BankAccounts>,
  ) {}

  public async exec(userId: number): Promise<BankAccountsResponse[]> {
    return await this.bankAccountsRepo.find({ where: { userId, isDeleted: false } });
  }
}
