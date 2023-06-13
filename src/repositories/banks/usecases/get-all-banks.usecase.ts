import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Banks } from '../entities/bank.entity';
import { BanksResponse } from 'src/customer/banks/dto/response/banks.response';

@Injectable()
export class GetAllBanksUseCase {
  constructor(
    @InjectRepository(Banks)
    private readonly bankRepo: Repository<Banks>,
  ) {}

  public async exec(): Promise<BanksResponse[]> {
    return await this.bankRepo.find();
  }
}
