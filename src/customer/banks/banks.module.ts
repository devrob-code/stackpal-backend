import { Module } from '@nestjs/common';
import { BankRepositoryModule } from 'src/repositories/banks/bank-repository.module';
import { BankController } from './banks.controller';
import { BankService } from './banks.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [BankRepositoryModule, HttpModule],
  controllers: [BankController],
  providers: [BankService],
})
export class BankModule {}
