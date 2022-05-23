import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { P2PAccountResponse } from 'src/repositories/p2p-accounts/response/p2p-account.response';
import { P2PAccountService } from './p2p-account.service';

@Controller('p2p-account')
@UseGuards(AuthGuard('jwt'))
export class P2PAccountController {
  constructor(private readonly p2pAccountService: P2PAccountService) {}

  @Get(':id')
  public async getP2PAccountById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<P2PAccountResponse> {
    return await this.p2pAccountService.getP2PAccountById(id);
  }

  @Get()
  public async getP2PAccounts(): Promise<P2PAccountResponse[]> {
    return await this.p2pAccountService.getP2PAccounts();
  }

  @Get('/random/get')
  public async getRandomP2PAccount(): Promise<P2PAccountResponse> {
    return await this.p2pAccountService.getRandomP2PAccount();
  }
}
