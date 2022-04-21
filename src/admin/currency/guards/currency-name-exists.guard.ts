import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CurrencyRepositoryService } from 'src/repositories/currencies/currency-repository.service';

@Injectable()
export class CurrencyNameExistsGuard implements CanActivate {
  constructor(private readonly currencyRepo: CurrencyRepositoryService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const name = request.body.name;
    const currency = await this.currencyRepo.getByCurrencyName(name);

    if (currency) {
      throw new HttpException(
        'Currency Name Already Exists',
        HttpStatus.CONFLICT,
      );
    }

    return true;
  }
}
