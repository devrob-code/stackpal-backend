import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { FiatTransactionsType } from '../../transactions.constants';

export class CreateFiatTransactionDto {
  @IsString()
  txId: string;

  @IsInt()
  userId: number;

  @IsInt()
  senderId: number;

  @IsInt()
  amount: number;

  @IsEnum(FiatTransactionsType)
  type: FiatTransactionsType;

  @IsOptional()
  @IsString()
  p2pAccountId?: number;

  @IsOptional()
  @IsString()
  receiverBankId?: number;

  @IsOptional()
  @IsString()
  transactionDate: String;
}
