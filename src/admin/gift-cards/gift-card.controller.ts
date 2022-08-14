import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../guards/admin.guard';
import { GiftCardDto } from './dto/request/gift-card.dto';
import { GiftCardResponse } from './dto/response/gift-card.response';
import { AdminGiftCardService } from './gift-card.service';

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
}
