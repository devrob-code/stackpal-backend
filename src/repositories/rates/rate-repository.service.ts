import { Injectable } from '@nestjs/common';
import { RatesTypes } from 'src/customer/rates/rates.constant';
import { Rate } from './entity/entity';
import { GetGiftCardRateUseCase } from './usecases/get-gift-card-rate';

@Injectable()
export class RateRepositoryService {
  constructor(
    private readonly getGiftCardRateUseCase: GetGiftCardRateUseCase,
  ) {}

  public async getGiftCardRate(type: RatesTypes): Promise<Rate> {
    return this.getGiftCardRateUseCase.exec(type);
  }
}
