import { Injectable } from '@nestjs/common';
import { GiftCardDepositDto } from 'src/customer/gift-cards/dto/request/gift-card-deposit.dto';
import {
  GiftCardDepositResponse,
  GiftCardDepositResponseData,
} from 'src/customer/gift-cards/dto/response/gift-card-deposit.response';
import { ChangeApprovalStatusUseCase } from './usecases/change-approval-status.usecase';
import { GetAllGiftCardDepositsUseCase } from './usecases/get-all-gift-card-deposits.usecase';
import { GetByIdUseCase } from './usecases/get-by-id.usecase';
import { GetByUserIdUseCase } from './usecases/get-by-user-id.usecase';
import { NewGiftCardDepositUseCase } from './usecases/new-gift-card-deposit.usecase';

@Injectable()
export class GiftCardDepositRepositoryService {
  constructor(
    private readonly newGiftCardDepositUseCase: NewGiftCardDepositUseCase,
    private readonly getByIdUseCase: GetByIdUseCase,
    private readonly changeApprovalStatusUseCase: ChangeApprovalStatusUseCase,
    private readonly getAllGiftCardDepositsUseCase: GetAllGiftCardDepositsUseCase,
    private readonly getByUserIdUseCase: GetByUserIdUseCase,
  ) {}

  public async newGiftCardDeposit(data: GiftCardDepositDto): Promise<GiftCardDepositResponseData> {
    return this.newGiftCardDepositUseCase.exec(data);
  }

  public async getById(id: number): Promise<GiftCardDepositResponseData> {
    return this.getByIdUseCase.exec(id);
  }

  public async changeGiftCardDepositApprovalStatus(id: number, status: boolean, approvedBy: number): Promise<boolean> {
    return this.changeApprovalStatusUseCase.exec(id, status, approvedBy);
  }

  public async getAllGiftCardDeposits(): Promise<GiftCardDepositResponseData[]> {
    return this.getAllGiftCardDepositsUseCase.exec();
  }

  public async getByUserId(userId: number): Promise<GiftCardDepositResponseData[]> {
    return this.getByUserIdUseCase.exec(userId);
  }
}
