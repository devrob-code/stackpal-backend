import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/repositories/users/entities/user.entity';
import { UserRepositoryService } from 'src/repositories/users/user-repository.service';
import { LoginDto } from './dto/request/login.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/request/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SignupResponse } from './dto/response/signup.response';
import { plainToInstance } from 'class-transformer';
import { LoginResponse } from './dto/response/login.response';
import { PayloadResponse } from './dto/response/payload.response';
import { MailService } from 'src/core/mail/mail.service';
import { VerificationRepositoryService } from 'src/repositories/verifications/verification-repository.service';
import { VerifyEmailDto } from './dto/request/verify-email.dto';
import { HelperService } from 'src/core/helpers/helper.service';
import { SmsService } from 'src/core/sms/sms.service';
import { PhoneVerificationDto } from './dto/request/phone-verification.dto';
import { VerifyPhoneDto } from './dto/request/verify-phone.dto';
import { ForgotPasswordDto } from './dto/request/forgot-password.dto';
import { RecoverPasswordDto } from './dto/request/recover-password.dto';
import { CurrencyRepositoryService } from 'src/repositories/currencies/currency-repository.service';
import { WalletRepositoryService } from 'src/repositories/wallets/wallet-repository.service';
import { CurrencyTypes } from 'src/customer/currency/currency.constants';
import { Wallet } from 'src/repositories/wallets/entities/wallet.entity';
import { APP_SOURCE, WEB_SOURCE } from './auth.constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepositoryService: UserRepositoryService,
    private readonly verificationRepositoryService: VerificationRepositoryService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
    private readonly smsService: SmsService,
    private readonly jwtService: JwtService,
    private readonly helperService: HelperService,
    private readonly currencyRepositoryService: CurrencyRepositoryService,
    private readonly walletRepositoryService: WalletRepositoryService,
  ) {}

  private checkPassword(password, hash) {
    return bcrypt.compare(password, hash);
  }

  public async signup(body: CreateUserDto): Promise<SignupResponse> {
    const signupUser = await this.userRepositoryService.createUser(body);
    return plainToInstance(SignupResponse, signupUser);
  }

  public async login(body: LoginDto): Promise<LoginResponse> {
    const { email, password } = body;
    const user: User = await this.userRepositoryService.getByEmail(email);

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    // compare passwords
    if (!(await this.checkPassword(password, user.password))) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    // generate and sign token
    const token = this._createToken({
      email: user.email,
      id: user.id,
      username: user.username,
      role: user.role,
    });

    // Assign all fiat currency to user if user does not have fiat currency
    await this.assignFiatCurrenciesToUser(user.id);

    const response = { ...user, ...token };
    return plainToInstance(LoginResponse, response);
  }

  public async validateUser(payload: PayloadResponse): Promise<User> {
    const user = await this.userRepositoryService.getByEmailAndId(payload.email, payload.id);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  private _createToken(email): { expiresIn: string; accessToken: string } {
    const accessToken = this.jwtService.sign(email);

    return {
      expiresIn: this.configService.get('jwt.expiresIn'),
      accessToken,
    };
  }

  public async sendEmailVerificationCode(body: { email: string; source?: string }): Promise<boolean> {
    const code = this.helperService.generateCode(6);
    const requestSource = !body.source ? WEB_SOURCE : APP_SOURCE;

    // Save Code to db
    await this.verificationRepositoryService.createEmailVerificationCode({
      email: body.email,
      code,
    });

    // Send the verification code
    return await this.mailService.sendUserEmailVerificationToken(body.email, code, requestSource);
  }

  public async verifyEmailAddress(body: VerifyEmailDto): Promise<boolean | string> {
    const encryptedEmail = body.email;
    const encryptedCode = body.code;

    const email = await this.helperService.decryptString(encryptedEmail);
    const code = await this.helperService.decryptString(encryptedCode);

    const foundData = await this.verificationRepositoryService.getEmailVerificationByEmailAndCode(email, code);

    if (foundData) {
      await this.userRepositoryService.updateUserByEmail(email, {
        emailVerified: true,
      });

      await this.verificationRepositoryService.deleteEmailVerificationCodeById(foundData.id);

      return email;
    }
    return false;
  }

  public async sendPhoneVerificationCode(body: PhoneVerificationDto): Promise<boolean> {
    const code = this.helperService.generateCode(6);

    // Save Code to db
    await this.verificationRepositoryService.createPhoneVerificationCode({
      phone: body.phone,
      code,
    });

    // Send the code
    return await this.smsService.sendUserPhoneVerificationToken(body.phone, code);
  }

  public async verifyPhone(body: VerifyPhoneDto): Promise<boolean | string> {
    const phone = body.phone;
    const code = body.code;
    const email = body.email;

    const foundData = await this.verificationRepositoryService.getPhoneVerificationByPhoneAndCode(phone, code);

    if (foundData) {
      await this.userRepositoryService.updateUserByEmail(email, {
        phoneVerified: true,
        phone,
      });

      await this.verificationRepositoryService.deletePhoneVerificationCodeById(foundData.id);

      return true;
    }
    return false;
  }

  public async forgotPassword(body: ForgotPasswordDto): Promise<boolean> {
    const user = await this.userRepositoryService.getByEmail(body.email);

    if (user) {
      return this.mailService.forgotPassword(body.email);
    }
  }

  public async recoverPassword(body: RecoverPasswordDto): Promise<boolean> {
    //TODO: Make the token expire
    const email = await this.helperService.decryptString(body.token);
    const password = await bcrypt.hash(body.newPassword, 10);

    return await this.userRepositoryService.updateUserByEmail(email, {
      password,
    });
  }

  public async validateToken(user: User): Promise<LoginResponse> {
    return plainToInstance(LoginResponse, user);
  }

  private async assignFiatCurrenciesToUser(userId: number): Promise<boolean> {
    const fiatCurrencies = await this.currencyRepositoryService.getFiatCurrencies();

    fiatCurrencies.forEach(async (fiatCurrency) => {
      // Check if user has this currency
      const wallet = await this.walletRepositoryService.getUserWalletByCurrencyId(userId, fiatCurrency.id);

      if (!wallet) {
        await this.walletRepositoryService.createWallet(userId, fiatCurrency.id);
      }
    });

    return true;
  }

  public async getWalletsByUserId(userId: number, network?: string): Promise<Wallet[] | Wallet> {
    return await this.walletRepositoryService.getWalletsByUserId(userId, network);
  }

  public async getIdByUserData(userData: string): Promise<number> {
    return await this.userRepositoryService.getIdByUserData(userData);
  }

  public async verifyEmailAddressCode(body: VerifyEmailDto): Promise<boolean | string> {
    const { code, email } = body;

    const foundData = await this.verificationRepositoryService.getEmailVerificationByEmailAndCode(email, code);

    if (foundData) {
      await this.userRepositoryService.updateUserByEmail(email, {
        emailVerified: true,
      });

      await this.verificationRepositoryService.deleteEmailVerificationCodeByEmail(email);

      return JSON.parse(email);
    }
    return false;
  }
}
