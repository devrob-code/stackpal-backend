import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RatesTypes } from 'src/customer/rates/rates.constant';
import { Repository } from 'typeorm';
import { Rate } from '../entity/entity';

@Injectable()
export class GetGiftCardRateUseCase {
  constructor(
    @InjectRepository(Rate)
    private readonly rateRepo: Repository<Rate>,
  ) {}

  public async exec(type: RatesTypes): Promise<Rate> {
    return this.rateRepo.findOne({
      where: { giftCardRate: type },
    });
  }
}
