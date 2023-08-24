import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GiftCardResponse, GiftCardResponseDto } from 'src/admin/gift-cards/dto/response/gift-card.response';
import { CheckGiftCardIdExists } from 'src/admin/gift-cards/guards/check-gift-card-id-exists.guard';
import { GiftCardDepositDto } from './dto/request/gift-card-deposit.dto';
import { GiftCardDepositResponse, GiftCardDepositResponseData } from './dto/response/gift-card-deposit.response';
import { GiftCardService } from './gift-card.service';
import { ActiveGiftCardResponse } from './dto/response/active-gift-card.response';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

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
  public async giftCardDeposit(@Body() body: GiftCardDepositDto, @Request() req): Promise<{ status: boolean }> {
    const data = {
      userId: req.user.id,
      ...body,
    };

    return await this.giftCardService.newGiftCardDeposit(data);
  }

  @Get('deposits/user/all')
  public async getUserGiftCardDeposit(@Request() req): Promise<GiftCardDepositResponse> {
    return await this.giftCardService.getByUserId(req.user.id);
  }

  @Get('/all/active')
  public async getActiveGiftCards(): Promise<ActiveGiftCardResponse> {
    return await this.giftCardService.getActiveGiftCards();
  }

  @Get('/denominations/:name')
  public async getGiftCardDenominationByName(@Param('name') name: string): Promise<any> {
    return await this.giftCardService.getGiftCardDenominationByName(name);
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<{ status: boolean; url: string }> {
    return await this.giftCardService.uploadGiftCard(file);
  }

  @Get('/receipts/all/:giftCardName')
  public async getGiftCardReceiptsByName(@Param('giftCardName') name: string): Promise<any> {
    return await this.giftCardService.getGiftCardReceiptsByGiftCardName(name);
  }
}
