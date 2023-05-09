import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ElectricityTransactions } from '../entities/electricity-transactions.entity';
import { ElectricityTransactionResponse } from 'src/customer/transactions/dto/response/electricity-transaction.response';

@Injectable()
export class CreateElectricityTransactionsUseCase {
  constructor(
    @InjectRepository(ElectricityTransactions)
    private readonly electricityTransactionRepo: Repository<ElectricityTransactions>,
  ) {}

  public async exec(electricityTransaction: Partial<ElectricityTransactions>): Promise<ElectricityTransactionResponse> {
    const newElectricityTransaction = this.electricityTransactionRepo.merge(
      new ElectricityTransactions(),
      electricityTransaction,
    );

    return this.electricityTransactionRepo.save(newElectricityTransaction);
  }
}
