import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GiftCardDepositRepositoryService } from 'src/repositories/gift-card-deposits/gift-card-deposit-repository.service';

@Injectable()
export class CheckGiftCardDepositIdExists implements CanActivate {
  constructor(
    private readonly giftCardDepositRepositoryService: GiftCardDepositRepositoryService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const giftCardDepositId =
      request.params.id || request.body.giftCardDepositId;

    if (giftCardDepositId === null) {
      throw new NotFoundException();
    }

    const giftCardDepositIdExists =
      await this.giftCardDepositRepositoryService.getById(giftCardDepositId);

    if (!giftCardDepositIdExists) {
      throw new HttpException('Gift Card Deposit not found.', 404);
    }

    return true;
  }
}
