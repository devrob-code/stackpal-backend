import { IsString } from 'class-validator';

export class VerifyBankAccountDto {
  @IsString()
  accountNumber: string;

  @IsString()
  bankId: string;
}
