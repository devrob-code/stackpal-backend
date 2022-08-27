import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BlockchainService } from './blockchain.service';

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
}
