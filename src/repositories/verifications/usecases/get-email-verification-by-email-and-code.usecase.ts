import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailVerification } from '../entities/email-verification.entity';

@Injectable()
export class GetEmailVerificationByEmailAndCodeUseCase {
  constructor(
    @InjectRepository(EmailVerification)
    private readonly emailVerificationRepo: Repository<EmailVerification>,
  ) {}

  public async exec(email: string, code: string): Promise<EmailVerification> {
    return this.emailVerificationRepo.findOne({
      where: {
        email,
        code,
      },
    });
  }
}
