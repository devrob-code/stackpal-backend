import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { AirtimeDataTypes } from '../../transactions.constants';

export class CreateAirtimeDataTransactionDto {
  @IsString()
  txId: string;

  @IsInt()
  userId: number;

  @IsInt()
  amount: number;

  @IsString()
  network: string;

  @IsString()
  @IsOptional()
  plan: string;

  @IsString()
  recipient: string;

  @IsString()
  billerTxId: string;

  @IsString()
  status: string;

  @IsEnum(AirtimeDataTypes)
  type: AirtimeDataTypes;
}
