import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

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
}
