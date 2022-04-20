import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/admin/guards/admin.guard';
import { CurrencyService } from './currency.service';
import { CurrencyResponse } from './dto/response/currency.response';

@Controller('currency')
@UseGuards(AuthGuard('jwt'))
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('/all')
  public async getAllWallet(): Promise<CurrencyResponse[]> {
    return await this.currencyService.getAllWallet();
  }
}
