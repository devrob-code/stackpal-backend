import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ElectricityTransactions } from '../entities/electricity-transactions.entity';
import { ElectricityTransactionResponse } from 'src/customer/transactions/dto/response/electricity-transaction.response';

@Injectable()
export class GetElectricityTransactionsByUserIdUseCase {
  constructor(
    @InjectRepository(ElectricityTransactions)
    private readonly electricityTransactionRepo: Repository<ElectricityTransactions>,
  ) {}

  public async exec(userId: number, limit?: number): Promise<ElectricityTransactionResponse[]> {
    return this.electricityTransactionRepo.find({
      where: {
        userId,
      },
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }
}
