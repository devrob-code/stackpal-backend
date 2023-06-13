import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrencyResponse } from 'src/customer/currency/dto/response/currency.response';
import { Repository } from 'typeorm';
import { BankAccounts } from '../entities/bank-account.entity';

@Injectable()
export class AddNewBankAccountUseCase {
  constructor(
    @InjectRepository(BankAccounts)
    private readonly bankAccountsRepo: Repository<BankAccounts>,
  ) {}

  public async exec(data: Partial<BankAccounts>, userId: number): Promise<any> {
    const body = { ...data, userId };

    const newBankAccount: BankAccounts = this.bankAccountsRepo.merge(new BankAccounts(), body);

    return this.bankAccountsRepo.save(newBankAccount);
  }
}
