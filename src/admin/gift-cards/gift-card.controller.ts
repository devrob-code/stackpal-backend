import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Patch,
  Param,
  ParseIntPipe,
  ParseBoolPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../guards/admin.guard';
import { GiftCardDto, UpdateGiftCardDto } from './dto/request/gift-card.dto';
import { GiftCardResponse } from './dto/response/gift-card.response';
import { AdminGiftCardService } from './gift-card.service';
import { CheckGiftCardDepositIdExists } from './guards/check-gift-card-deposit-id-exists.guard';
import { CheckGiftCardIdExists } from './guards/check-gift-card-id-exists.guard';

@Controller('gift-card')
@UseGuards(AuthGuard('jwt'), AdminGuard)
export class AdminGiftCardController {
  constructor(private readonly adminGiftCardService: AdminGiftCardService) {}

  @Post()
  public async addNewGiftCard(
    @Body() body: GiftCardDto,
    @Request() req,
  ): Promise<GiftCardResponse> {
    const data = {
      adminId: req.user.id,
      ...body,
    };

    return await this.adminGiftCardService.addNewGiftCard(data);
  }

  @UseGuards(CheckGiftCardIdExists)
  @Patch('/:id')
  public async updateGiftCardById(
    @Body() body: UpdateGiftCardDto,
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<boolean> {
    return await this.adminGiftCardService.updateGiftCardById(id, body);
  }

  @UseGuards(CheckGiftCardDepositIdExists)
  @Patch('approval/:id/:status')
  public async changeGiftCardDepositApprovalStatus(
    @Request() req,
    @Param('id', new ParseIntPipe()) id: number,
    @Param('status', new ParseBoolPipe()) status: boolean,
  ): Promise<boolean> {
    return await this.adminGiftCardService.changeGiftCardDepositApprovalStatus(
      id,
      status,
      req.user.id,
    );
  }
}
