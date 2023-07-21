import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { CryptoTransactionSendType, CryptoTransactionsType, FiatTransactionsType } from '../../transactions.constants';

export class CreateCryptoTransactionDto {
  @IsString()
  txId: string;

  @IsOptional()
  @IsString()
  blockchainTxId?: string;

  @IsInt()
  userId: number;

  @IsInt()
  amount: number;

  @IsString()
  network: string;

  @IsEnum(CryptoTransactionsType)
  type: CryptoTransactionsType;

  @IsOptional()
  @IsEnum(CryptoTransactionSendType)
  sendType?: CryptoTransactionSendType;

  @IsString()
  senderWalletAddress: string;

  @IsString()
  receiverWalletAddress: string;

  @IsOptional()
  @IsString()
  blockTime?: string;

  @IsOptional()
  @IsString()
  transactionDate: String;
}
