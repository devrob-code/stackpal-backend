import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GiftCardResponse } from 'src/admin/gift-cards/dto/response/gift-card.response';
import { GiftCardService } from './gift-card.service';

@Controller('gift-card')
@UseGuards(AuthGuard('jwt'))
export class GiftCardController {
  constructor(private readonly giftCardService: GiftCardService) {}

  @Get(':id')
  public async getById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<GiftCardResponse> {
    return await this.giftCardService.getById(id);
  }
}
