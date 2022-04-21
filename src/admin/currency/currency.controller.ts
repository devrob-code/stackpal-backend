import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrencyResponse } from 'src/customer/currency/dto/response/currency.response';
import { CurrencyIdExistsGuard } from 'src/customer/currency/guards/currency-id-exists.guard';
import { AdminGuard } from '../guards/admin.guard';
import { AdminCurrencyService } from './currency.service';
import { NewCurrencyDto } from './dto/request/new-currency.dto';
import { UpdateCurrencyDto } from './dto/request/update-currency.dto';
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

  @Patch(':id')
  @UseGuards(CurrencyIdExistsGuard)
  public async updateCurrencyById(
    @Param('id') id: number,
    @Body() body: UpdateCurrencyDto,
  ): Promise<boolean> {
    return await this.adminCurrencyService.updateCurrencyById(id, body);
  }

  @Delete(':id')
  @UseGuards(CurrencyIdExistsGuard)
  public async deleteCurrencyById(@Param('id') id: number): Promise<boolean> {
    return await this.adminCurrencyService.deleteCurrencyById(id);
  }
}
