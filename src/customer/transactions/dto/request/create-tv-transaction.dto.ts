import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateTvTransactionDto {
  @IsString()
  txId: string;

  @IsInt()
  userId: number;

  @IsInt()
  amount: number;

  @IsString()
  network: string;

  @IsString()
  plan: string;

  @IsString()
  recipient: string;

  @IsString()
  billerTxId: string;

  @IsString()
  status: string;
}
