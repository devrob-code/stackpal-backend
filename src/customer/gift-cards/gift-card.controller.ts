import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('gift-card')
@UseGuards(AuthGuard('jwt'))
export class GiftCardController {
  //constructor(private readonly giftCardController: GiftCardService) {}
}
