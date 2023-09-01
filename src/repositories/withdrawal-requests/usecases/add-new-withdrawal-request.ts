import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WithdrawalRequest } from '../entities/withdrawal-requests.entity';

@Injectable()
export class AddNewWithdrawalRequestUseCase {
  constructor(
    @InjectRepository(WithdrawalRequest)
    private readonly withdrawalRequestRepo: Repository<WithdrawalRequest>,
  ) {}

  public async exec(data: Partial<WithdrawalRequest>, userId: number): Promise<any> {
    const body = { ...data, userId };

    const newWithdrawalRequest: WithdrawalRequest = this.withdrawalRequestRepo.merge(new WithdrawalRequest(), body);

    return this.withdrawalRequestRepo.save(newWithdrawalRequest);
  }
}
