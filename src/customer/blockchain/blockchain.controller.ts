import { Controller, Get, UseGuards } from '@nestjs/common';
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
}
