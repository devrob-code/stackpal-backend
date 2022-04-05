import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/request/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/request/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() body: LoginDto): Promise<any> {
    return this.authService.login(body);
  }

  @Post('signup')
  public async signup(@Body() body: CreateUserDto): Promise<any> {
    return this.authService.signup(body);
  }
}
