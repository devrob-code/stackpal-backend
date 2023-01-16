import { IsInt, IsOptional, IsString } from 'class-validator';

export class SendCoinDto {
  @IsString()
  receiver: string;

  @IsString()
  amount: string;

  @IsOptional()
  @IsInt()
  userId: number;

  // TODO: Enum Send Speed, high, low, medium
  @IsString()
  sendSpeed: string;

  @IsOptional()
  receiverId: number;
}
