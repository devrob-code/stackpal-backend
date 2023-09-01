import { Injectable } from '@nestjs/common';
import { WithdrawalRequestRepositoryService } from 'src/repositories/withdrawal-requests/withdrawal-request.repository.service';
import { NewWithdrawalRequestDto } from './dto/request/new-withdrawal-request.dto';
import { HelperService } from 'src/core/helpers/helper.service';

@Injectable()
export class WithdrawalRequestService {
  constructor(
    private readonly withdrawalRequestRepositoryService: WithdrawalRequestRepositoryService,
    private readonly helperService: HelperService,
  ) {}

  public async addNewWithdrawalRequest(data: NewWithdrawalRequestDto, userId: number): Promise<any> {
    data.transactionId = this.helperService.generateTransactionId('SPAL_', 8);
    const response = await this.withdrawalRequestRepositoryService.addNewWithdrawalRequest(data, userId);

    return {
      status: true,
      response,
    };
  }
}
