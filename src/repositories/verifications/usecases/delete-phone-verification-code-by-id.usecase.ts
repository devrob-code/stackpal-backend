import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhoneVerification } from '../entities/phone-verification.entity';

@Injectable()
export class DeletePhoneVerificationCodeByIdUseCase {
  constructor(
    @InjectRepository(PhoneVerification)
    private readonly phoneVerification: Repository<PhoneVerification>,
  ) {}

  public async exec(phone: string): Promise<boolean> {
    const result = await this.phoneVerification
      .createQueryBuilder()
      .delete()
      .from(PhoneVerification)
      .where('phone = :phone', { phone })
      .execute();

    return !!result;
  }
}
