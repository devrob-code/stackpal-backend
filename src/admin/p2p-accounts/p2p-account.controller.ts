import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginResponse } from 'src/auth/dto/response/login.response';
import { P2PAccount } from 'src/repositories/p2p-accounts/entities/p2p-account.entity';
import { AdminGuard } from '../guards/admin.guard';
import { NewP2PAccountDto } from './dto/request/new-p2p-account.dto';
import { AdminP2PAccountService } from './p2p-account.service';

@Controller('p2p-account')
@UseGuards(AuthGuard('jwt'), AdminGuard)
export class AdminP2PAccountController {
  constructor(
    private readonly adminP2pAccountService: AdminP2PAccountService,
  ) {}

  @Post()
  public async addNewP2PAccount(
    @Body() body: NewP2PAccountDto,
    @Request() req,
  ): Promise<any> {
    const data = {
      createdBy: req.user.id,
      ...body,
    };

    return await this.adminP2pAccountService.addNewP2PAccount(data);
  }
}
