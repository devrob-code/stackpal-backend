import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor() {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  public async get(): Promise<any> {
    return 'hello';
  }
}
