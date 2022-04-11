import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailVerification } from '../entities/email-verification.entity';

@Injectable()
export class CreateEmailVerificationCodeUseCase {
  constructor(
    @InjectRepository(EmailVerification)
    private readonly emailVerificationRepo: Repository<EmailVerification>,
  ) {}

  public async exec(
    emailVerification: Partial<EmailVerification>,
  ): Promise<EmailVerification> {
    const newEmailVerification: EmailVerification =
      this.emailVerificationRepo.merge(
        new EmailVerification(),
        emailVerification,
      );

    return this.emailVerificationRepo.save(newEmailVerification);
  }
}
