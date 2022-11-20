import { Injectable } from '@nestjs/common';
import { PhoneVerificationDto } from 'src/auth/dto/request/phone-verification.dto';
import { EmailVerification } from './entities/email-verification.entity';
import { PhoneVerification } from './entities/phone-verification.entity';
import { CreateEmailVerificationCodeUseCase } from './usecases/create-email-verification-code.usecase';
import { CreatePhoneVerificationCodeUseCase } from './usecases/create-phone-verification-code.usecase';
import { DeleteEmailVerificationCodeByEmailUseCase } from './usecases/delete-email-verification-code-by-email.usecase';
import { DeleteEmailVerificationCodeByIdUseCase } from './usecases/delete-email-verification-code-by-id.usecase';
import { DeletePhoneVerificationCodeByIdUseCase } from './usecases/delete-phone-verification-code-by-id.usecase';
import { GetEmailVerificationByEmailAndCodeUseCase } from './usecases/get-email-verification-by-email-and-code.usecase';
import { GetPhoneVerificationByPhoneAndCodeUseCase } from './usecases/get-phone-verification-by-phone-and-code.usecase';

@Injectable()
export class VerificationRepositoryService {
  constructor(
    private readonly createEmailVerificationCodeUseCase: CreateEmailVerificationCodeUseCase,
    private readonly createPhoneVerificationCodeUseCase: CreatePhoneVerificationCodeUseCase,
    private readonly getEmailVerificationByEmailAndCodeUseCase: GetEmailVerificationByEmailAndCodeUseCase,
    private readonly getPhoneVerificationByPhoneAndCodeUseCase: GetPhoneVerificationByPhoneAndCodeUseCase,
    private readonly deleteEmailVerificationCodeByIdlUseCase: DeleteEmailVerificationCodeByIdUseCase,
    private readonly deletePhoneVerificationCodeByIdUseCase: DeletePhoneVerificationCodeByIdUseCase,
    private readonly deleteEmailVerificationCodeByEmailUseCase: DeleteEmailVerificationCodeByEmailUseCase,
  ) {}

  public async createEmailVerificationCode(body: { email: string; code: string }): Promise<EmailVerification> {
    return this.createEmailVerificationCodeUseCase.exec(body);
  }

  public async getEmailVerificationByEmailAndCode(email: string, code: string): Promise<EmailVerification> {
    return this.getEmailVerificationByEmailAndCodeUseCase.exec(email, code);
  }

  public async deleteEmailVerificationCodeById(id: number) {
    return this.deleteEmailVerificationCodeByIdlUseCase.exec(id);
  }

  public async deleteEmailVerificationCodeByEmail(email: string) {
    return this.deleteEmailVerificationCodeByEmailUseCase.exec(email);
  }

  public async createPhoneVerificationCode(body: PhoneVerificationDto): Promise<PhoneVerification> {
    return this.createPhoneVerificationCodeUseCase.exec(body);
  }

  public async getPhoneVerificationByPhoneAndCode(phone: string, code: string): Promise<PhoneVerification> {
    return this.getPhoneVerificationByPhoneAndCodeUseCase.exec(phone, code);
  }

  public async deletePhoneVerificationCodeById(id: number) {
    return this.deletePhoneVerificationCodeByIdUseCase.exec(id);
  }
}
