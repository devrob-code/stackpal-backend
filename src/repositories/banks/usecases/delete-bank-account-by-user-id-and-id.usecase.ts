import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BankAccounts } from '../entities/bank-account.entity';

@Injectable()
export class DeleteBankAccountByUserIdAndIdUseCase {
  constructor(
    @InjectRepository(BankAccounts)
    private readonly bankAccountRepo: Repository<BankAccounts>,
  ) {}

  public async exec(bankAccountId: number, userId: number): Promise<boolean> {
    const deleteBankAccount = await this.bankAccountRepo

      .createQueryBuilder()
      .update(BankAccounts)
      .set({ isDeleted: true })
      .where('id = :id', { id: bankAccountId })
      .andWhere('userId = :userId', { userId })
      .execute();

    return !!deleteBankAccount;
  }
}
