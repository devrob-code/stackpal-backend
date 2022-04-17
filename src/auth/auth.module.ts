import { Module } from '@nestjs/common';
import { UserRepositoryModule } from 'src/repositories/users/user-repository.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { MailModule } from 'src/core/mail/mail.module';
import { ConfigService } from '@nestjs/config';
import { VerificationRepositoryModule } from 'src/repositories/verifications/verification-repository.module';
import { HelperModule } from 'src/core/helpers/helper.module';
import { SmsModule } from 'src/core/sms/sms.module';

@Module({
  imports: [
    UserRepositoryModule,
    VerificationRepositoryModule,
    MailModule,
    HelperModule,
    SmsModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('jwt.secret'),
        signOptions: {
          expiresIn: configService.get('jwt.expiresIn'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
