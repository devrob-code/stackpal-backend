import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class VerifyPhoneDto {
  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsString()
  @IsOptional()
  email: string;
}
