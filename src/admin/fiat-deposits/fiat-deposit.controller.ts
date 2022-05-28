import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UpdateFiatDepositDto } from 'src/customer/fiat-deposits/dto/request/update-fiat-deposit.dto';
import { FiatDepositResponse } from 'src/customer/fiat-deposits/dto/response/fiat-deposit.response';
import { CheckIfWalletIsFiatGuard } from 'src/customer/wallet/guards/check-if-wallet-is-fiat.guard';
import { CheckWalletIdExistsGuard } from 'src/customer/wallet/guards/check-wallet-id-exists.guard';
import { AdminGuard } from '../guards/admin.guard';
import { AdminFiatDepositService } from './fiat-deposit.service';
import { CheckFiatDepositExistsGuard } from './guards/check-fiat-deposit-exists.guard';
import { CheckIfFiatDepositIsValidGuard } from './guards/check-if-fiat-deposit-is-valid.guard';

@Controller('fiat-deposit')
@UseGuards(AuthGuard('jwt'), AdminGuard)
export class AdminFiatDepositController {
  constructor(
    private readonly adminFiatDepositService: AdminFiatDepositService,
  ) {}

  @Patch('/:id')
  @UseGuards(CheckFiatDepositExistsGuard, CheckIfFiatDepositIsValidGuard)
  public async changeFiatDepositStatus(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: UpdateFiatDepositDto,
    @Request() req,
  ): Promise<boolean> {
    const data = {
      approvedBy: req.user.id,
      ...body,
    };
    return await this.adminFiatDepositService.changeFiatDepositStatus(id, data);
  }

  @Get()
  public async getFiatDeposits(): Promise<FiatDepositResponse[]> {
    return await this.adminFiatDepositService.getFiatDeposits();
  }

  @Get('/user/:userId')
  public async getFiatDepositsByUserId(
    @Param('userId', new ParseIntPipe()) userId: number,
  ): Promise<FiatDepositResponse[]> {
    return await this.adminFiatDepositService.getFiatDepositsByUserId(userId);
  }
}
