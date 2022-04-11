import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailVerification } from './entities/email-verification.entity';
import { PhoneVerification } from './entities/phone-verification.entity';
import { CreateEmailVerificationCodeUseCase } from './usecases/create-email-verification-code.usecase';
import { CreatePhoneVerificationCodeUseCase } from './usecases/create-phone-verification-code.usecase';
import { DeleteEmailVerificationCodeByEmailUseCase } from './usecases/delete-email-verification-code-by-email.usecase';
import { GetEmailVerificationByEmailAndCodeUseCase } from './usecases/get-email-verification-by-email-and-code.usecase';
import { VerificationRepositoryService } from './verification-repository.service';

@Module({
  imports: [TypeOrmModule.forFeature([EmailVerification, PhoneVerification])],
  providers: [
    VerificationRepositoryService,
    CreateEmailVerificationCodeUseCase,
    DeleteEmailVerificationCodeByEmailUseCase,
    GetEmailVerificationByEmailAndCodeUseCase,
    CreatePhoneVerificationCodeUseCase,
  ],
  exports: [VerificationRepositoryService],
})
export class VerificationRepositoryModule {}
