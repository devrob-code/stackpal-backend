import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GiftCardResponse } from 'src/customer/gift-cards/dto/response/gift-card.response';
import { AdminGuard } from '../guards/admin.guard';
import { GiftCardStatuses } from './gift-card.constants';
import { AdminGiftCardService } from './gift-card.service';

@Controller('gift-card')
@UseGuards(AuthGuard('jwt'), AdminGuard)
export class AdminGiftCardController {
  constructor(private readonly adminGiftCardService: AdminGiftCardService) {}

  @Get('/all')
  public async getAll(): Promise<GiftCardResponse[]> {
    return await this.adminGiftCardService.getAllGiftCards();
  }

  @Put('/change-status/:id/:status')
  public async changeStatus(
    @Param('id', new ParseIntPipe()) id: number,
    @Param('status') status: GiftCardStatuses,
    @Request() req,
  ): Promise<boolean> {
    const approvedBy = req.user.id;
    return await this.adminGiftCardService.changeStatus(id, status, approvedBy);
  }
}
