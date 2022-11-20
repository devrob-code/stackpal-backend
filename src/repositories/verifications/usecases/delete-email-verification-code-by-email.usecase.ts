import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailVerification } from '../entities/email-verification.entity';

@Injectable()
export class DeleteEmailVerificationCodeByEmailUseCase {
  constructor(
    @InjectRepository(EmailVerification)
    private readonly emailVerification: Repository<EmailVerification>,
  ) {}

  public async exec(email: string): Promise<boolean> {
    const result = await this.emailVerification
      .createQueryBuilder()
      .delete()
      .from(EmailVerification)
      .where('email = :email', { email })
      .execute();

    return !!result;
  }
}
