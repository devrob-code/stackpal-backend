import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrencyResponse } from 'src/customer/currency/dto/response/currency.response';
import { AdminGuard } from '../guards/admin.guard';
import { AdminCurrencyService } from './currency.service';
import { NewCurrencyDto } from './dto/request/new-currency.dto';
import { CurrencyAliasExistsGuard } from './guards/currency-alias-exists.guard';
import { CurrencyNameExistsGuard } from './guards/currency-name-exists.guard';

@Controller('currency')
@UseGuards(AuthGuard('jwt'), AdminGuard)
export class AdminCurrencyController {
  constructor(private readonly adminCurrencyService: AdminCurrencyService) {}

  @Post()
  @UseGuards(CurrencyNameExistsGuard, CurrencyAliasExistsGuard)
  public async addNewCurrency(
    @Body() body: NewCurrencyDto,
  ): Promise<CurrencyResponse> {
    return await this.adminCurrencyService.addNewCurrency(body);
  }
}
