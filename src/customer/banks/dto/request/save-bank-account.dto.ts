import { IsString } from 'class-validator';

export class SaveBankAccountDto {
  @IsString()
  accountName: string;

  @IsString()
  accountNumber: string;

  @IsString()
  bankName: string;
}
