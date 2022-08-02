import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rate } from '../entity/rate.entity';

@Injectable()
export class GetRateUseCase {
  constructor(
    @InjectRepository(Rate)
    private readonly rateRepo: Repository<Rate>,
  ) {}

  public async exec(): Promise<Rate> {
    return this.rateRepo.findOne({
      where: { id: 1 },
    });
  }
}
