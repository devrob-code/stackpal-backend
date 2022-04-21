import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CurrencyRepositoryService } from 'src/repositories/currencies/currency-repository.service';

@Injectable()
export class CurrencyAliasExistsGuard implements CanActivate {
  constructor(private readonly currencyRepo: CurrencyRepositoryService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const alias = request.body.alias;
    const currency = await this.currencyRepo.getByCurrencyAlias(alias);

    if (currency) {
      throw new HttpException(
        'Currency Alias Already Exists',
        HttpStatus.CONFLICT,
      );
    }

    return true;
  }
}
