import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GiftCardResponse } from 'src/admin/gift-cards/dto/response/gift-card.response';
import { Repository } from 'typeorm';
import { GiftCard } from '../entities/gift-card.entity';

@Injectable()
export class GetByIdUseCase {
  constructor(
    @InjectRepository(GiftCard)
    private readonly giftCardRepo: Repository<GiftCard>,
  ) {}

  public async exec(id: number): Promise<GiftCardResponse> {
    return this.giftCardRepo.findOne({
      where: { id },
      relations: ['user'],
    });
  }
}
