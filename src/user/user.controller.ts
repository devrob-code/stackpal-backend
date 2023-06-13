import { Body, Controller, Get, Post, Put, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDataDto } from './dto/request/user-data.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('username/exists')
  public async checkUsernameExists(@Body() body: { username: string }): Promise<boolean> {
    return this.userService.checkUsernameExists(body.username);
  }

  @Post('email/exists')
  public async checkEmailExists(@Body() body: { email: string }): Promise<boolean> {
    return this.userService.checkEmailExists(body.email);
  }

  @Put('update')
  @UseGuards(AuthGuard('jwt'))
  public async verifyBvn(@Body() body: UpdateUserDataDto, @Request() req): Promise<boolean> {
    return this.userService.verifyBvn(req.user.id, body);
  }
}
