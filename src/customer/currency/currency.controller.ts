import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrencyService } from './currency.service';
import { CurrencyResponse } from './dto/response/currency.response';

@Controller('currency')
@UseGuards(AuthGuard('jwt'))
export class CurrencyController {
  constructor(private readonly walletService: CurrencyService) {}

  @Get('/all')
  public async getAllWallet(): Promise<CurrencyResponse[]> {
    return await this.walletService.getAllWallet();
  }
}
