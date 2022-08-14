import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GiftCardRepositoryService } from 'src/repositories/gift-cards/gift-card-repository.service';

@Injectable()
export class CheckGiftCardIdExists implements CanActivate {
  constructor(
    private readonly giftCardRepositoryService: GiftCardRepositoryService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const giftCardId = request.params.id || request.body.giftCardId;

    if (giftCardId === null) {
      throw new NotFoundException();
    }

    const giftCardIdExists = await this.giftCardRepositoryService.getById(
      giftCardId,
    );

    if (!giftCardIdExists) {
      throw new HttpException('Gift Card not found.', 404);
    }

    return true;
  }
}
