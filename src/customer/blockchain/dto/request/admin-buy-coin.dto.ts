import { IsInt, IsOptional, IsString } from 'class-validator';

export class AdminBuyCoinDto {
  @IsString()
  coin: string;

  @IsString()
  amount: string;
}
