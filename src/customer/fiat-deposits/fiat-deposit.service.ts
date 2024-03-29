import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { FiatDepositRepositoryService } from 'src/repositories/fiat-deposits/fiat-deposit.repository.service';
import { FiatDepositDto } from './dto/request/fiat-deposit.dto';
import { FiatDepositResponse } from './dto/response/fiat-deposit.response';

@Injectable()
export class FiatDepositService {
  constructor(private readonly fiatDepositRepositoryService: FiatDepositRepositoryService) {}

  public async depositFiat(body: FiatDepositDto): Promise<{ status: boolean; response: FiatDepositResponse }> {
    const newFiatDeposit = await this.fiatDepositRepositoryService.newFiatDeposit(body);
    const response = plainToInstance(FiatDepositResponse, newFiatDeposit);
    return { status: true, response };
  }

  public async getFiatDepositsByUserId(userId: number): Promise<FiatDepositResponse[]> {
    const fiatDeposits = await this.fiatDepositRepositoryService.getFiatDepositsByUserId(userId);
    return plainToInstance(FiatDepositResponse, fiatDeposits);
  }
}
