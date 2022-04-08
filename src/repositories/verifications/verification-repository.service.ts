import { Injectable } from '@nestjs/common';
import { EmailVerification } from './entities/email-verification.entity';
import { CreateEmailVerificationCodeUseCase } from './usecases/create-email-verification-code.usecase';

@Injectable()
export class VerificationRepositoryService {
  constructor(private readonly createEmailVerificationCodeUseCase: CreateEmailVerificationCodeUseCase) {}

  public async createEmailVerificationCode(body: { email: string; code: string }): Promise<EmailVerification> {
    return this.createEmailVerificationCodeUseCase.exec(body);
  }
}
