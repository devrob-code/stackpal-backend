import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrencyTypes } from './currency.constants';
import { CurrencyService } from './currency.service';
import { CurrencyQueryDto } from './dto/request/currency-query.dto';
import { CurrencyResponse } from './dto/response/currency.response';
import { CurrencyIdExistsGuard } from './guards/currency-id-exists.guard';

@Controller('currency')
@UseGuards(AuthGuard('jwt'))
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('/all')
  public async getAllCurrency(@Query() query: CurrencyQueryDto): Promise<CurrencyResponse[]> {
    return await this.currencyService.getAllCurrency(query);
  }

  @Get('/:id')
  @UseGuards(CurrencyIdExistsGuard)
  public async getCurrencyById(@Param('id') id: number): Promise<CurrencyResponse> {
    return await this.currencyService.getCurrencyById(id);
  }

  @Get('/all/:type')
  public async getAllCurrencyByType(@Param('type') type: CurrencyTypes): Promise<CurrencyResponse[]> {
    return await this.currencyService.getAllCurrencyByType(type);
  }
}
