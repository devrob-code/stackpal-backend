import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../guards/admin.guard';
import { NewP2PAccountDto } from './dto/request/new-p2p-account.dto';
import { P2PAccountResponse } from '../../repositories/p2p-accounts/response/p2p-account.response';
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
  ): Promise<P2PAccountResponse> {
    const data = {
      createdBy: req.user.id,
      ...body,
    };

    return await this.adminP2pAccountService.addNewP2PAccount(data);
  }
}
