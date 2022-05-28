import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FiatDepositRepositoryService } from 'src/repositories/fiat-deposits/fiat-deposit.repository.service';

@Injectable()
export class CheckFiatDepositExistsGuard implements CanActivate {
  constructor(private readonly fiatDepositRepo: FiatDepositRepositoryService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const fiatDepositId = request.params.id || request.body.fiatDepositId;

    if (fiatDepositId === null) {
      throw new NotFoundException();
    }

    const fiatDepositIdExists = await this.fiatDepositRepo.getFiatDepositById(
      fiatDepositId,
    );

    if (!fiatDepositIdExists) {
      throw new HttpException('Fiat Deposit not found.', 404);
    }

    return true;
  }
}
