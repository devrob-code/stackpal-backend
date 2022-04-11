import { Injectable } from '@nestjs/common';
import { PhoneVerificationDto } from 'src/auth/dto/request/phone-verification.dto';
import { EmailVerification } from './entities/email-verification.entity';
import { PhoneVerification } from './entities/phone-verification.entity';
import { CreateEmailVerificationCodeUseCase } from './usecases/create-email-verification-code.usecase';
import { CreatePhoneVerificationCodeUseCase } from './usecases/create-phone-verification-code.usecase';
import { DeleteEmailVerificationCodeByEmailUseCase } from './usecases/delete-email-verification-code-by-email.usecase';
import { GetEmailVerificationByEmailAndCodeUseCase } from './usecases/get-email-verification-by-email-and-code.usecase';

@Injectable()
export class VerificationRepositoryService {
  constructor(
    private readonly createEmailVerificationCodeUseCase: CreateEmailVerificationCodeUseCase,
    private readonly createPhoneVerificationCodeUseCase: CreatePhoneVerificationCodeUseCase,
    private readonly getEmailVerificationByEmailAndCodeUseCase: GetEmailVerificationByEmailAndCodeUseCase,
    private readonly deleteEmailVerificationCodeByEmailUseCase: DeleteEmailVerificationCodeByEmailUseCase,
  ) {}

  public async createEmailVerificationCode(body: {
    email: string;
    code: string;
  }): Promise<EmailVerification> {
    return this.createEmailVerificationCodeUseCase.exec(body);
  }

  public async getEmailVerificationByEmailAndCode(
    email: string,
    code: string,
  ): Promise<EmailVerification> {
    return this.getEmailVerificationByEmailAndCodeUseCase.exec(email, code);
  }

  public async deleteEmailVerificationCodeByEmail(email: string) {
    return this.deleteEmailVerificationCodeByEmailUseCase.exec(email);
  }

  public async createPhoneVerificationCode(
    body: PhoneVerificationDto,
  ): Promise<PhoneVerification> {
    return this.createPhoneVerificationCodeUseCase.exec(body);
  }
}
