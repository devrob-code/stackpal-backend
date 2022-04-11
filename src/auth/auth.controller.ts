import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/request/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/request/login.dto';
import { PhoneVerificationDto } from './dto/request/phone-verification.dto';
import { VerifyPhoneDto } from './dto/request/verify-phone.dto';
import { LoginResponse } from './dto/response/login.response';
import { SignupResponse } from './dto/response/signup.response';
import { CheckEmailVerifiedGuard } from './guards/check-email-verified.guard';
import { CheckPhoneVerifiedGuard } from './guards/check-phone-verified.guard';
import { EmailExistsGuard } from './guards/email-exists.guard';
import { PhoneExistsGuard } from './guards/phone-exists.guard';
import { UsernameExistsGuard } from './guards/username-exists.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(CheckEmailVerifiedGuard, CheckPhoneVerifiedGuard)
  public async login(@Body() body: LoginDto): Promise<LoginResponse> {
    return this.authService.login(body);
  }

  @Post('signup')
  @UseGuards(UsernameExistsGuard, EmailExistsGuard)
  public async signup(@Body() body: CreateUserDto): Promise<SignupResponse> {
    return this.authService.signup(body);
  }

  @Post('send-email-verification-code')
  public async sendEmailVerificationCode(
    @Body() body: { email: string },
  ): Promise<boolean> {
    return await this.authService.sendEmailVerificationCode(body);
  }

  @Post('send-phone-verification-code')
  @UseGuards(PhoneExistsGuard)
  public async sendPhoneVerificationCode(
    @Body() body: PhoneVerificationDto,
  ): Promise<boolean> {
    return await this.authService.sendPhoneVerificationCode(body);
  }

  @Get('verify-email')
  public async verifyEmailAddress(
    @Query('el') email: string,
    @Query('ce') code: string,
  ): Promise<boolean | string> {
    return await this.authService.verifyEmailAddress({ email, code });
  }

  @Post('verify-phone')
  public async VerifyPhone(
    @Body() body: VerifyPhoneDto,
  ): Promise<boolean | string> {
    return await this.authService.verifyPhone(body);
  }
}
