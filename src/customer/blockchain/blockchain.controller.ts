import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BlockchainService } from './blockchain.service';

@Controller('currency')
@UseGuards(AuthGuard('jwt'))
export class BlockchainController {
  constructor(private readonly blockchainService: BlockchainService) {}
}
