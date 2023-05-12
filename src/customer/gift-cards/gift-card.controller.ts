import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GiftCardResponse, GiftCardResponseDto } from 'src/admin/gift-cards/dto/response/gift-card.response';
import { CheckGiftCardIdExists } from 'src/admin/gift-cards/guards/check-gift-card-id-exists.guard';
import { GiftCardDepositDto } from './dto/request/gift-card-deposit.dto';
import { GiftCardDepositResponse } from './dto/response/gift-card-deposit.response';
import { GiftCardService } from './gift-card.service';

@Controller('gift-card')
@UseGuards(AuthGuard('jwt'))
export class GiftCardController {
  constructor(private readonly giftCardService: GiftCardService) {}

  @UseGuards(CheckGiftCardIdExists)
  @Get(':id')
  public async getById(@Param('id', new ParseIntPipe()) id: number): Promise<GiftCardResponse> {
    return await this.giftCardService.getById(id);
  }

  @Get()
  public async getAll(): Promise<GiftCardResponseDto> {
    return await this.giftCardService.getAll();
  }

  @Post('deposit/new')
  public async giftCardDeposit(@Body() body: GiftCardDepositDto, @Request() req): Promise<GiftCardDepositResponse> {
    const data = {
      userId: req.user.id,
      ...body,
    };

    return await this.giftCardService.newGiftCardDeposit(data);
  }

  @Get('deposits/user/all')
  public async getUserGiftCardDeposit(@Request() req): Promise<GiftCardDepositResponse[]> {
    return await this.giftCardService.getByUserId(req.user.id);
  }
}
