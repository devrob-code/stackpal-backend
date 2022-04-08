import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailVerification } from './entities/email-verification.entity';
import { CreateEmailVerificationCodeUseCase } from './usecases/create-email-verification-code.usecase';
import { DeleteEmailVerificationCodeByEmailUseCase } from './usecases/delete-email-verification-code-by-email.usecase';
import { VerificationRepositoryService } from './verification-repository.service';

@Module({
  imports: [TypeOrmModule.forFeature([EmailVerification])],
  providers: [
    VerificationRepositoryService,
    CreateEmailVerificationCodeUseCase,
    DeleteEmailVerificationCodeByEmailUseCase,
  ],
  exports: [VerificationRepositoryService],
})
export class VerificationRepositoryModule {}
