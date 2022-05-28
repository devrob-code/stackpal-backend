import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UpdateFiatDepositDto } from 'src/customer/fiat-deposits/dto/request/update-fiat-deposit.dto';
import { FiatDepositResponse } from 'src/customer/fiat-deposits/dto/response/fiat-deposit.response';
import { WalletAction } from 'src/customer/wallet/wallet.constants';
import { FiatDepositRepositoryService } from 'src/repositories/fiat-deposits/fiat-deposit.repository.service';
import { WalletRepositoryService } from 'src/repositories/wallets/wallet-repository.service';
@Injectable()
export class AdminFiatDepositService {
  constructor(
    private readonly fiatDepositRepositoryService: FiatDepositRepositoryService,
    private readonly walletRepositoryService: WalletRepositoryService,
  ) {}

  public async changeFiatDepositStatus(
    id: number,
    body: UpdateFiatDepositDto,
  ): Promise<boolean> {
    const fiatDeposit =
      await this.fiatDepositRepositoryService.getFiatDepositById(id);
    body.isApproved &&
      this.walletRepositoryService.changeWalletBalance(
        fiatDeposit.walletId,
        fiatDeposit.amount,
        WalletAction.increase,
      );

    return this.fiatDepositRepositoryService.changeFiatDepositStatus(id, body);
  }

  public async getFiatDeposits(): Promise<FiatDepositResponse[]> {
    const fiatDeposits =
      await this.fiatDepositRepositoryService.getFiatDeposits();
    return plainToInstance(FiatDepositResponse, fiatDeposits);
  }

  public async getFiatDepositsByUserId(
    userId: number,
  ): Promise<FiatDepositResponse[]> {
    const fiatDeposits =
      await this.fiatDepositRepositoryService.getFiatDepositsByUserId(userId);
    return plainToInstance(FiatDepositResponse, fiatDeposits);
  }
}
