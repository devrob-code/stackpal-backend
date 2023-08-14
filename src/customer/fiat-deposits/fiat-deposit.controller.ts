import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CheckP2PAccountIdExistsGuard } from 'src/admin/p2p-accounts/guards/check-p2p-account-exists.guard';
import { CheckIfWalletIsFiatGuard } from '../wallet/guards/check-if-wallet-is-fiat.guard';
import { CheckIfWalletIsUserWalletGuard } from '../wallet/guards/check-if-wallet-is-user-wallet.guard';
import { CheckWalletIdExistsGuard } from '../wallet/guards/check-wallet-id-exists.guard';
import { FiatDepositDto } from './dto/request/fiat-deposit.dto';
import { FiatDepositResponse } from './dto/response/fiat-deposit.response';
import { FiatDepositService } from './fiat-deposit.service';

@Controller('fiat-deposit')
@UseGuards(AuthGuard('jwt'))
export class FiatDepositController {
  constructor(private readonly fiatDepositService: FiatDepositService) {}

  @Post()
  @UseGuards(
    CheckP2PAccountIdExistsGuard,
    CheckWalletIdExistsGuard,
    CheckIfWalletIsFiatGuard,
    CheckIfWalletIsUserWalletGuard,
  )
  public async depositFiat(
    @Body() body: FiatDepositDto,
    @Request() req,
  ): Promise<{ status: boolean; response: FiatDepositResponse }> {
    const data = {
      userId: req.user.id,
      ...body,
    };
    return await this.fiatDepositService.depositFiat(data);
  }

  @Get('/me')
  public async getUserFiatDeposit(@Request() req) {
    return await this.fiatDepositService.getFiatDepositsByUserId(req.user.id);
  }
} //
