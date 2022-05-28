import { Injectable } from '@nestjs/common';
import { FiatDepositDto } from 'src/customer/fiat-deposits/dto/request/fiat-deposit.dto';
import { UpdateFiatDepositDto } from 'src/customer/fiat-deposits/dto/request/update-fiat-deposit.dto';
import { FiatDepositResponse } from 'src/customer/fiat-deposits/dto/response/fiat-deposit.response';
import { GetFiatDepositByIdUseCase } from './usecases/get-fiat-deposit-by-id.usecase';
import { GetFiatDepositsByUserIdUseCase } from './usecases/get-fiat-deposit-by-user-id.usecase';
import { GetFiatDepositsUseCase } from './usecases/get-fiat-deposits.usecase';
import { NewFiatDepositUseCase } from './usecases/new-fiat-deposit.usecase';
import { UpdateFiatDepositByIdUseCase } from './usecases/update-fiat-deposit-by-id.usecase';

@Injectable()
export class FiatDepositRepositoryService {
  constructor(
    private readonly newFiatDepositUseCase: NewFiatDepositUseCase,
    private readonly getFiatDepositByIdUseCase: GetFiatDepositByIdUseCase,
    private readonly updateFiatDepositByIdUseCase: UpdateFiatDepositByIdUseCase,
    private readonly getFiatDepositsUseCase: GetFiatDepositsUseCase,
    private readonly getFiatDepositsByUserIdUseCase: GetFiatDepositsByUserIdUseCase,
  ) {}

  public async newFiatDeposit(
    body: FiatDepositDto,
  ): Promise<FiatDepositResponse> {
    return this.newFiatDepositUseCase.exec(body);
  }

  public async getFiatDepositById(id: number): Promise<FiatDepositResponse> {
    return this.getFiatDepositByIdUseCase.exec(id);
  }

  public async changeFiatDepositStatus(
    id: number,
    body: UpdateFiatDepositDto,
  ): Promise<boolean> {
    return this.updateFiatDepositByIdUseCase.exec(id, body);
  }

  public async getFiatDeposits(): Promise<FiatDepositResponse[]> {
    return this.getFiatDepositsUseCase.exec();
  }

  public async getFiatDepositsByUserId(
    userId: number,
  ): Promise<FiatDepositResponse[]> {
    return this.getFiatDepositsByUserIdUseCase.exec(userId);
  }
}
