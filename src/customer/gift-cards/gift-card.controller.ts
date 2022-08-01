import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GiftCardService } from './gift-card.service';

@Controller('gift-card')
@UseGuards(AuthGuard('jwt'))
export class GiftCardController {
  constructor(private readonly giftCardController: GiftCardService) {}
}
