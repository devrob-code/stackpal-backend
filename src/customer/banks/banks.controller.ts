import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BankService } from './banks.service';
import { VerifyBankAccountDto } from './dto/request/verify-bank-account.dto';
import { SaveBankAccountDto } from './dto/request/save-bank-account.dto';

@Controller('banks')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  public async getAllBanks(): Promise<any> {
    return this.bankService.getAllBanks();
  }

  @Post('account/verify')
  @UseGuards(AuthGuard('jwt'))
  public async verifyAccount(@Body() body: VerifyBankAccountDto): Promise<any> {
    return this.bankService.verifyAccount(body);
  }

  @Get('/user')
  @UseGuards(AuthGuard('jwt'))
  public async getUserBankAccounts(@Request() req): Promise<any> {
    return this.bankService.getUserBankAccounts(req.user.id);
  }

  @Post('account/save')
  @UseGuards(AuthGuard('jwt'))
  public async addBankAccount(@Body() body: SaveBankAccountDto, @Request() req): Promise<any> {
    return this.bankService.addBankAccount(body, req.user.id);
  }

  @Delete('account/:id')
  @UseGuards(AuthGuard('jwt'))
  public async deleteBankAccount(@Param('id') bankAccountId: number, @Request() req): Promise<any> {
    return this.bankService.deleteBankAccount(bankAccountId, req.user.id);
  }

  @Post('bvn/verify')
  public async verifyBvn(@Body('bvnNo') bvnNo: string): Promise<any> {
    return this.bankService.verifyBvn(bvnNo);
  }
}
