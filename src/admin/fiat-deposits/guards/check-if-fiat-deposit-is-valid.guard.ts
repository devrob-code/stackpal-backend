import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FiatDepositRepositoryService } from 'src/repositories/fiat-deposits/fiat-deposit.repository.service';

@Injectable()
export class CheckIfFiatDepositIsValidGuard implements CanActivate {
  constructor(private readonly fiatDepositRepo: FiatDepositRepositoryService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const fiatDepositId = request.params.id || request.body.fiatDepositId;

    const fiatDeposit = await this.fiatDepositRepo.getFiatDepositById(
      fiatDepositId,
    );

    if (fiatDeposit.approvedBy !== null) {
      throw new HttpException('Fiat Deposit is invalid', 404);
    }

    return true;
  }
}
