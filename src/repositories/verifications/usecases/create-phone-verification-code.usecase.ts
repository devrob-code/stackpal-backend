import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhoneVerification } from '../entities/phone-verification.entity';

@Injectable()
export class CreatePhoneVerificationCodeUseCase {
  constructor(
    @InjectRepository(PhoneVerification)
    private readonly phoneVerificationRepo: Repository<PhoneVerification>,
  ) {}

  public async exec(
    phoneVerification: Partial<PhoneVerification>,
  ): Promise<PhoneVerification> {
    const newPhoneVerification: PhoneVerification =
      this.phoneVerificationRepo.merge(
        new PhoneVerification(),
        phoneVerification,
      );

    return this.phoneVerificationRepo.save(newPhoneVerification);
  }
}
