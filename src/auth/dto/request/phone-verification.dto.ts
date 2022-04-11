import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';
import { PHONE_REGEX } from 'src/auth/auth.constants';

export class PhoneVerificationDto {
  @IsString()
  @IsNotEmpty()
  @Matches(PHONE_REGEX)
  phone: string;

  @IsOptional()
  @IsString()
  code: string;
}
