import { IsInt, IsOptional } from 'class-validator';

export class FiatDepositDto {
  @IsInt()
  @IsOptional()
  userId?: number;

  @IsInt()
  p2pAccountId: number;

  @IsInt()
  amount: number;

  @IsInt()
  walletId: number;
}
