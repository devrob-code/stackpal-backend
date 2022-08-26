import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BlockchainController } from './blockchain.controller';
import { BlockchainService } from './blockchain.service';

@Module({
  imports: [HttpModule],
  controllers: [BlockchainController],
  providers: [BlockchainService],
})
export class BlockchainModule {}
