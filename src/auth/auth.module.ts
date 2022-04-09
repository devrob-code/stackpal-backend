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

@Module({
  imports: [
    UserRepositoryModule,
    VerificationRepositoryModule,
    MailModule,
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