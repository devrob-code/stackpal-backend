// import { Injectable } from '@nestjs/common';
// import { plainToInstance } from 'class-transformer';
// import { GiftCardResponse } from 'src/customer/gift-cards/dto/response/gift-card.response';
// import { RatesTypes } from 'src/customer/rates/rates.constant';
// import { GiftCardRepositoryService } from 'src/repositories/gift-cards/gift-card-repository.service';
// import { RateRepositoryService } from 'src/repositories/rates/rate-repository.service';
// import { GiftCardStatuses } from './gift-card.constants';

// @Injectable()
// export class AdminGiftCardService {
//   constructor(
//     private readonly giftCardRepositoryService: GiftCardRepositoryService,
//     private readonly rateRepositoryService: RateRepositoryService,
//   ) {}

//   public async getAllGiftCards(): Promise<GiftCardResponse[]> {
//     const giftCards = await this.giftCardRepositoryService.getAll();

//     return plainToInstance(GiftCardResponse, giftCards);
//   } ComeBack

//   public async changeStatus(
//     id: number,
//     status: GiftCardStatuses,
//     approvedBy: number,
//   ): Promise<boolean> {
//     const rate = await this.rateRepositoryService.getRate();

//     return this.giftCardRepositoryService.changeStatus(
//       id,
//       status,
//       approvedBy,
//       rate.giftCardRate,
//     );
//   }
// }
