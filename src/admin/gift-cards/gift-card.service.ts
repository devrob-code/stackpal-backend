import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { GiftCardDepositResponse } from 'src/customer/gift-cards/dto/response/gift-card-deposit.response';
import { GiftCardDepositRepositoryService } from 'src/repositories/gift-card-deposits/gift-card-deposit-repository.service';
import { GiftCardRepositoryService } from 'src/repositories/gift-cards/gift-card-repository.service';
import { GiftCardDto, UpdateGiftCardDto } from './dto/request/gift-card.dto';
import { GiftCardResponse } from './dto/response/gift-card.response';
import { GiftCardReceiptDto } from './dto/request/gift-card-receipt.dto';
import { GiftCardReceiptResponse } from './dto/response/gift-card-receipt.response';
import { GiftCardReceiptsRepositoryService } from 'src/repositories/gift-card-receipts/gift-card-receipts.repository.service';

@Injectable()
export class AdminGiftCardService {
  constructor(
    private readonly giftCardRepositoryService: GiftCardRepositoryService,
    private readonly giftCardDepositRepositoryService: GiftCardDepositRepositoryService,
    private readonly giftCardReceiptsRepositoryService: GiftCardReceiptsRepositoryService,
  ) {}

  public async addNewGiftCard(data: GiftCardDto): Promise<GiftCardResponse> {
    return this.giftCardRepositoryService.newGiftCard(data);
  }

  public async updateGiftCardById(id: number, body: UpdateGiftCardDto): Promise<boolean> {
    return this.giftCardRepositoryService.updateGiftCardById(id, body);
  }

  public async changeGiftCardDepositApprovalStatus(id: number, status: boolean, approvedBy: number): Promise<boolean> {
    return this.giftCardDepositRepositoryService.changeGiftCardDepositApprovalStatus(id, status, approvedBy);
  }

  public async getAllGiftCardDeposits(): Promise<GiftCardDepositResponse[]> {
    const giftCardDeposits = await this.giftCardDepositRepositoryService.getAllGiftCardDeposits();
    return plainToInstance(GiftCardDepositResponse, giftCardDeposits);
  }

  public async getGiftCardDepositById(id: number): Promise<GiftCardDepositResponse> {
    const giftCardDeposit = await this.giftCardDepositRepositoryService.getById(id);
    return plainToInstance(GiftCardDepositResponse, giftCardDeposit);
  }

  public async addNewGiftCardReceipt(data: GiftCardReceiptDto): Promise<GiftCardReceiptResponse> {
    return this.giftCardReceiptsRepositoryService.addNewGiftCardReceipt(data);
  }
}
