import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhoneVerification } from '../entities/phone-verification.entity';

@Injectable()
export class GetPhoneVerificationByPhoneAndCodeUseCase {
  constructor(
    @InjectRepository(PhoneVerification)
    private readonly phoneVerificationRepo: Repository<PhoneVerification>,
  ) {}

  public async exec(phone: string, code: string): Promise<PhoneVerification> {
    return this.phoneVerificationRepo.findOne({
      where: {
        phone,
        code,
      },
    });
  }
}
