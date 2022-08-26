import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateGiftCardDto } from 'src/admin/gift-cards/dto/request/gift-card.dto';
import { Repository } from 'typeorm';
import { GiftCard } from '../entities/gift-card.entity';
@Injectable()
export class UpdateGiftCardByIdUseCase {
  constructor(
    @InjectRepository(GiftCard)
    private readonly giftCardRepo: Repository<GiftCard>,
  ) {}

  public async exec(id: number, body: UpdateGiftCardDto): Promise<boolean> {
    const updateGiftCard = this.giftCardRepo
      .createQueryBuilder()
      .update('giftCards')
      .set(body)
      .where('id = :id', { id: id })
      .execute();

    return !!updateGiftCard;
  }
}
