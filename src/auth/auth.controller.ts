import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/request/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/request/login.dto';
import { EmailExistsGuard } from './guards/email-exists.guard';
import { UsernameExistsGuard } from './guards/username-exists.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() body: LoginDto): Promise<any> {
    return this.authService.login(body);
  }

  @UseGuards(UsernameExistsGuard, EmailExistsGuard)
  @Post('signup')
  public async signup(@Body() body: CreateUserDto): Promise<any> {
    return this.authService.signup(body);
  }
}
