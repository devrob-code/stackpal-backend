import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CurrencyRepositoryService } from 'src/repositories/currencies/currency-repository.service';

@Injectable()
export class CurrencyIdExistsGuard implements CanActivate {
  constructor(private readonly currencyRepo: CurrencyRepositoryService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const id = request.params.currencyId;
    const currency = await this.currencyRepo.getByCurrencyId(id);

    if (!currency) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return true;
  }
}
