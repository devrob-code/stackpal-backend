import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Wallet } from 'src/repositories/wallets/entities/wallet.entity';
import { CreateUserDto } from 'src/user/dto/request/create-user.dto';
import { MailRequestSource } from './auth.constants';
import { AuthService } from './auth.service';
import { ForgotPasswordDto } from './dto/request/forgot-password.dto';
import { LoginDto } from './dto/request/login.dto';
import { PhoneVerificationDto } from './dto/request/phone-verification.dto';
import { RecoverPasswordDto } from './dto/request/recover-password.dto';
import { UserDataDto } from './dto/request/user-data.dto';
import { UserIdDto } from './dto/request/user-id.dto';
import { VerifyEmailDto } from './dto/request/verify-email.dto';
import { VerifyPhoneDto } from './dto/request/verify-phone.dto';
import { LoginResponse } from './dto/response/login.response';
import { SignupResponse } from './dto/response/signup.response';
import { AccountExistsGuard } from './guards/account-exists.guard';
import { CheckEmailVerifiedGuard } from './guards/check-email-verified.guard';
import { CheckPhoneVerifiedGuard } from './guards/check-phone-verified.guard';
import { EmailExistsGuard } from './guards/email-exists.guard';
import { PhoneExistsGuard } from './guards/phone-exists.guard';
import { UsernameExistsGuard } from './guards/username-exists.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AccountExistsGuard, CheckEmailVerifiedGuard, CheckPhoneVerifiedGuard)
  public async login(@Body() body: LoginDto): Promise<LoginResponse> {
    return this.authService.login(body);
  }

  @Post('signup')
  @UseGuards(UsernameExistsGuard, EmailExistsGuard)
  public async signup(@Body() body: CreateUserDto): Promise<SignupResponse> {
    return this.authService.signup(body);
  }

  @Post('send-email-verification-code')
  public async sendEmailVerificationCode(@Body() body: { email: string; source: MailRequestSource }): Promise<boolean> {
    return await this.authService.sendEmailVerificationCode(body);
  }

  @Post('send-phone-verification-code')
  @UseGuards(PhoneExistsGuard)
  public async sendPhoneVerificationCode(@Body() body: PhoneVerificationDto): Promise<boolean> {
    return await this.authService.sendPhoneVerificationCode(body);
  }

  @Get('verify-email')
  public async verifyEmailAddress(@Query('el') email: string, @Query('ce') code: string): Promise<boolean | string> {
    return await this.authService.verifyEmailAddress({ email, code });
  }

  @Post('verify-phone')
  public async VerifyPhone(@Body() body: VerifyPhoneDto): Promise<boolean | string> {
    return await this.authService.verifyPhone(body);
  }

  @Post('forgot-password')
  public async forgotPassword(@Body() body: ForgotPasswordDto): Promise<boolean> {
    return await this.authService.forgotPassword(body);
  }

  @Post('recover-password')
  public async recoverPassword(@Body() body: RecoverPasswordDto): Promise<boolean> {
    return await this.authService.recoverPassword(body);
  }

  @Get('validate-token')
  @UseGuards(AuthGuard('jwt'))
  public async validateToken(@Req() { user }): Promise<LoginResponse> {
    return await this.authService.validateToken(user);
  }

  @Post('get-wallets-by-user-id')
  @UseGuards(AuthGuard('jwt'))
  public async getWalletsByUserId(@Body() body: UserIdDto): Promise<Wallet[] | Wallet> {
    return await this.authService.getWalletsByUserId(body.userId, null);
  }

  @Post('verify-email')
  public async verifyEmailAddressCode(@Body() body: VerifyEmailDto): Promise<boolean | string> {
    return await this.authService.verifyEmailAddressCode(body);
  }

  @Post('create-pin')
  public async createPin(@Body() body: { pin: string; email: string }): Promise<boolean> {
    return await this.authService.createPin(body);
  }
}
