import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrencyResponse } from 'src/customer/currency/dto/response/currency.response';
import { Repository } from 'typeorm';
import { Currency } from '../entities/currency.entity';

@Injectable()
export class GetCurrencyByAliasUseCase {
  constructor(
    @InjectRepository(Currency) private readonly userRepo: Repository<Currency>,
  ) {}

  public async exec(alias: string): Promise<CurrencyResponse> {
    return this.userRepo.findOne({
      where: {
        alias,
      },
    });
  }
}
