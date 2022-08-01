import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CurrencyRepositoryService } from 'src/repositories/currencies/currency-repository.service';

@Injectable()
export class CheckGiftCardTypeGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.body.cardNo && !request.body.imageUrl) {
      throw new HttpException(
        'Gift Card No or Image must be supplied',
        HttpStatus.BAD_REQUEST,
      );
    }

    return true;
  }
}
