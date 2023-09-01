import { Injectable } from '@nestjs/common';

import { AddNewWithdrawalRequestUseCase } from './usecases/add-new-withdrawal-request';
import { NewWithdrawalRequestDto } from 'src/customer/withdrawal-request/dto/request/new-withdrawal-request.dto';
import { GetAllWithdrawalRequestByUserIdUseCase } from './usecases/get-all-withdrawal-request-by-user-id.usecase';

@Injectable()
export class WithdrawalRequestRepositoryService {
  constructor(
    private readonly addNewWithdrawalRequestUseCase: AddNewWithdrawalRequestUseCase,
    private readonly getAllWithdrawalRequestByUserIdUseCase: GetAllWithdrawalRequestByUserIdUseCase,
  ) {}

  public async addNewWithdrawalRequest(data: NewWithdrawalRequestDto, userId: number): Promise<any> {
    return await this.addNewWithdrawalRequestUseCase.exec(data, userId);
  }

  public async getAllWithdrawalRequestByUserId(userId: number): Promise<any> {
    return await this.getAllWithdrawalRequestByUserIdUseCase.exec(userId);
  }
}
