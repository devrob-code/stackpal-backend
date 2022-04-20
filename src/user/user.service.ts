import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CurrencyRepositoryService } from 'src/repositories/currencies/currency-repository.service';

@Injectable()
export class UserService {
  constructor(
    private readonly currencyRepositoryService: CurrencyRepositoryService,
  ) {}
}
