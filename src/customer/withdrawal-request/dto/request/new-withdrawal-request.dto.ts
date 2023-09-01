import { IsInt, IsOptional, IsString } from 'class-validator';

export class NewWithdrawalRequestDto {
  @IsInt()
  bankAccountId: number;

  @IsInt()
  amount: number;

  @IsOptional()
  @IsString()
  transactionId?: string;
}
