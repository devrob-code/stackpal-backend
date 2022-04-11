import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailVerification } from './entities/email-verification.entity';
import { PhoneVerification } from './entities/phone-verification.entity';
import { CreateEmailVerificationCodeUseCase } from './usecases/create-email-verification-code.usecase';
import { CreatePhoneVerificationCodeUseCase } from './usecases/create-phone-verification-code.usecase';
import { DeleteEmailVerificationCodeByIdUseCase } from './usecases/delete-email-verification-code-by-id.usecase';
import { DeletePhoneVerificationCodeByIdUseCase } from './usecases/delete-phone-verification-code-by-id.usecase';
import { GetEmailVerificationByEmailAndCodeUseCase } from './usecases/get-email-verification-by-email-and-code.usecase';
import { GetPhoneVerificationByPhoneAndCodeUseCase } from './usecases/get-phone-verification-by-phone-and-code.usecase';
import { VerificationRepositoryService } from './verification-repository.service';

@Module({
  imports: [TypeOrmModule.forFeature([EmailVerification, PhoneVerification])],
  providers: [
    VerificationRepositoryService,
    CreateEmailVerificationCodeUseCase,
    DeleteEmailVerificationCodeByIdUseCase,
    GetEmailVerificationByEmailAndCodeUseCase,
    CreatePhoneVerificationCodeUseCase,
    DeletePhoneVerificationCodeByIdUseCase,
    GetPhoneVerificationByPhoneAndCodeUseCase,
  ],
  exports: [VerificationRepositoryService],
})
export class VerificationRepositoryModule {}
