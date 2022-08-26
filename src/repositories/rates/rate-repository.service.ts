import { Injectable } from '@nestjs/common';
import { Rate } from './entity/rate.entity';
import { GetRateUseCase } from './usecases/get-rate';

@Injectable()
export class RateRepositoryService {
  constructor(private readonly getRateUseCase: GetRateUseCase) {}

  public async getRate(): Promise<Rate> {
    return this.getRateUseCase.exec();
  }
}
