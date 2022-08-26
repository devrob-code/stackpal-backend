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
}
