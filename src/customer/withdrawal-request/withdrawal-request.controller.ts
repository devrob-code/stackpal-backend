import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NewWithdrawalRequestDto } from './dto/request/new-withdrawal-request.dto';
import { WithdrawalRequestService } from './withdrawal-request.service';

@Controller('withdrawal-request')
export class WithdrawalRequestController {
  constructor(private readonly withdrawalRequestService: WithdrawalRequestService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  public async addNewWithdrawalRequest(@Body() body: NewWithdrawalRequestDto, @Request() req): Promise<any> {
    return this.withdrawalRequestService.addNewWithdrawalRequest(body, req.user.id);
  }
}
