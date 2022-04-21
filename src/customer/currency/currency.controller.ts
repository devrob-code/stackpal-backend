import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrencyService } from './currency.service';
import { CurrencyResponse } from './dto/response/currency.response';
import { CurrencyIdExistsGuard } from './guards/currency-id-exists.guard';

@Controller('currency')
@UseGuards(AuthGuard('jwt'))
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('/all')
  public async getAlCurrency(): Promise<CurrencyResponse[]> {
    return await this.currencyService.getAllCurrency();
  }

  @Get('/:currencyId')
  @UseGuards(CurrencyIdExistsGuard)
  public async getCurrencyById(
    @Param('currencyId') currencyId: number,
  ): Promise<CurrencyResponse> {
    return await this.currencyService.getCurrencyById(currencyId);
  }
}
