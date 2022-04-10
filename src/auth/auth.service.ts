import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/repositories/users/entities/user.entity';
import { UserRepositoryService } from 'src/repositories/users/user-repository.service';
import { LoginDto } from './dto/request/login.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/request/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SignupResponse } from './dto/response/signup.response';
import { plainToClass } from 'class-transformer';
import { LoginResponse } from './dto/response/login.response';
import { PayloadResponse } from './dto/response/payload.response';
import { MailService } from 'src/core/mail/mail.service';
import { VerificationRepositoryService } from 'src/repositories/verifications/verification-repository.service';
import { VerifyEmailDto } from './dto/request/verify-email.dto';
import { HelperService } from 'src/core/helpers/helper.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepositoryService: UserRepositoryService,
    private readonly verificationRepositoryService: VerificationRepositoryService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
    private readonly helperService: HelperService,
  ) {}

  private checkPassword(password, hash) {
    return bcrypt.compare(password, hash);
  }

  public async signup(body: CreateUserDto): Promise<SignupResponse> {
    const signupUser = await this.userRepositoryService.createUser(body);
    return plainToClass(SignupResponse, signupUser);
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
    });

    const response = { ...user, ...token };
    return plainToClass(LoginResponse, response);
  }

  public async validateUser(payload: PayloadResponse): Promise<User> {
    const user = await this.userRepositoryService.getByEmailAndId(
      payload.email,
      payload.id,
    );
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

  public async sendVerificationCode(body: { email: string }): Promise<boolean> {
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Save Code to db
    await this.verificationRepositoryService.createEmailVerificationCode({
      email: body.email,
      code: code,
    });

    // Send the verification code
    return await this.mailService.sendUserEmailVerificationToken(
      body.email,
      code,
    );
  }

  public async verifyEmailAddress(body: VerifyEmailDto): Promise<boolean> {
    const encryptedEmail = body.email;
    const encryptedCode = body.code;

    const email = await this.helperService.decryptString(encryptedEmail);
    const code = await this.helperService.decryptString(encryptedCode);

    const foundData =
      await this.verificationRepositoryService.getEmailVerificationByEmailAndCode(
        email,
        code,
      );

    if (foundData) {
      await this.userRepositoryService.updateUserByEmail(email, {
        emailVerified: true,
      });

      await this.verificationRepositoryService.deleteEmailVerificationCodeByEmail(
        email,
      );

      return true;
    }
    return false;
  }
}
