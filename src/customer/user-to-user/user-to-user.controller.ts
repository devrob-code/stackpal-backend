import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserToUserService } from './user-to-user.service';
import { SendFiatDto } from './dto/request/send-fiat.dto';
import { SendFiatResponse } from './dto/response/send-fiate.response';

@Controller('user-to-user')
@UseGuards(AuthGuard('jwt'))
export class UserToUserController {
  constructor(private readonly userToUserService: UserToUserService) {}

  @Post('/fiat/send')
  public async sendFiat(@Body() body: SendFiatDto, @Request() req): Promise<SendFiatResponse> {
    return await this.userToUserService.sendFiat(body, req.user.id);
  }
}
