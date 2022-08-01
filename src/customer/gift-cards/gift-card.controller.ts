import { Body, Controller, UseGuards, Request, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GiftCardDto } from './dto/request/gift-card.dto';
import { GiftCardResponse } from './dto/response/gift-card.response';
import { GiftCardService } from './gift-card.service';
import { CheckGiftCardTypeGuard } from './guards/check-gift-card-type.guard';

@Controller('gift-card')
@UseGuards(AuthGuard('jwt'))
export class GiftCardController {
  constructor(private readonly giftCardService: GiftCardService) {}

  @Post()
  @UseGuards(CheckGiftCardTypeGuard)
  public async newGiftCard(
    @Body() body: GiftCardDto,
    @Request() req,
  ): Promise<GiftCardResponse> {
    const data = {
      userId: req.user.id,
      ...body,
    };
    return await this.giftCardService.newGiftCard(data);
  }
}
