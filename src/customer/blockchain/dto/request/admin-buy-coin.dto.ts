import { IsInt, IsOptional, IsString } from 'class-validator';

export class AdminBuyCoinDto {
  @IsString()
  coin: string;

  @IsString()
  amount: string;

  @IsString()
  @IsOptional()
  naira: string;
}

export class AdminSellCoinDto {
  @IsString()
  coin: string;

  @IsString()
  amount: string;

  @IsString()
  @IsOptional()
  balance: string;
}
