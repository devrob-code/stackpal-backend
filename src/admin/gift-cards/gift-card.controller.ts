import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GiftCardResponse } from 'src/customer/gift-cards/dto/response/gift-card.response';
import { AdminGuard } from '../guards/admin.guard';
import { AdminGiftCardService } from './gift-card.service';

@Controller('gift-card')
@UseGuards(AuthGuard('jwt'), AdminGuard)
export class AdminGiftCardController {
  constructor(private readonly adminGiftCardService: AdminGiftCardService) {}

  @Get('/all')
  public async getAll(): Promise<GiftCardResponse[]> {
    return await this.adminGiftCardService.getAllGiftCards();
  }
}
