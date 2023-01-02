import { Controller, Get, UseGuards, Request, Body, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BlockchainService } from './blockchain.service';
import { AdminBuyCoinDto } from './dto/request/admin-buy-coin.dto';
import { SendCoinDto } from './dto/request/send-coin.dto';

@Controller('blockchain')
@UseGuards(AuthGuard('jwt'))
export class BlockchainController {
  constructor(private readonly blockchainService: BlockchainService) {}

  @Get('prices/all')
  public async getCoinPrices(): Promise<any> {
    return this.blockchainService.getCoinPrices();
  }

  @Get('balance/xrp')
  public async getXrpBalance(@Request() req): Promise<any> {
    const userId = req.user.id;
    return this.blockchainService.getXrpBalance(userId);
  }

  @Get('balance/btc')
  public async getBTCBalance(@Request() req): Promise<any> {
    const userId = req.user.id;
    return this.blockchainService.getBTCBalance(userId);
  }

  @Get('balance/bch')
  public async getBCHBalance(@Request() req): Promise<any> {
    const userId = req.user.id;
    return this.blockchainService.getBCHBalance(userId);
  }

  @Get('balance/erc20')
  public async getERC20Balance(@Request() req): Promise<any> {
    const userId = req.user.id;
    return this.blockchainService.getERC20Balance(userId);
  }

  @Get('balance/ngn')
  public async getNGNBalance(@Request() req): Promise<any> {
    const userId = req.user.id;
    return this.blockchainService.getNGNBalance(userId);
  }

  @Get('transaction-history/eth')
  public async getETHTransactionHistory(@Request() req): Promise<any> {
    const userId = req.user.id;
    return this.blockchainService.getETHTransactionHistory(userId);
  }

  @Get('transaction-history/btc')
  public async getBTCTransactionHistory(@Request() req): Promise<any> {
    const userId = req.user.id;
    return this.blockchainService.getBTCTransactionHistory(userId);
  }

  @Get('transaction-history/bch')
  public async getBCHTransactionHistory(@Request() req): Promise<any> {
    const userId = req.user.id;
    return this.blockchainService.getBCHTransactionHistory(userId);
  }

  @Get('transaction-history/xrp')
  public async getXRPTransactionHistory(@Request() req): Promise<any> {
    const userId = req.user.id;
    return this.blockchainService.getXRPTransactionHistory(userId);
  }

  @Post('send/btc')
  public async sendBTC(@Request() req, @Body() body: SendCoinDto): Promise<any> {
    const data: SendCoinDto = {
      userId: req.user.id,
      ...body,
    };

    return this.blockchainService.sendBTC(data);
  }

  @Post('send/eth')
  public async sendETH(@Request() req, @Body() body: SendCoinDto): Promise<any> {
    const data: SendCoinDto = {
      userId: req.user.id,
      ...body,
    };

    return this.blockchainService.sendETH(data);
  }

  @Post('send/bch')
  public async sendBCH(@Request() req, @Body() body: SendCoinDto): Promise<any> {
    const data: SendCoinDto = {
      userId: req.user.id,
      ...body,
    };

    return this.blockchainService.sendBCH(data);
  }

  @Post('send/usdc')
  public async sendUSDC(@Request() req, @Body() body: SendCoinDto): Promise<any> {
    const data: SendCoinDto = {
      userId: req.user.id,
      ...body,
    };

    return this.blockchainService.sendUSDC(data);
  }

  @Post('send/usdt')
  public async sendUSDT(@Request() req, @Body() body: SendCoinDto): Promise<any> {
    const data: SendCoinDto = {
      userId: req.user.id,
      ...body,
    };

    return this.blockchainService.sendUSDT(data);
  }

  @Post('send/xrp')
  public async sendXRP(@Request() req, @Body() body: SendCoinDto): Promise<any> {
    const data: SendCoinDto = {
      userId: req.user.id,
      ...body,
    };

    return this.blockchainService.sendXRP(data);
  }

  @Get('dashboard/balance')
  public async dashboardBalances(@Request() req): Promise<any> {
    return this.blockchainService.dashboardBalances(req.user.id);
  }

  @Get('/usd/rate')
  public async getUsdRate(): Promise<any> {
    return this.blockchainService.getUsdRate();
  }

  @Post('/send/now/btc')
  public async adminSendBTC(@Request() req, @Body() body: AdminBuyCoinDto): Promise<any> {
    return this.blockchainService.adminSendBTC(req.user.id, body);
  }
}
