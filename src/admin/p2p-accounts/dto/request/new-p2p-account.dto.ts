import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class NewP2PAccountDto {
  @IsString()
  accountName: string;

  @IsString()
  accountNumber: string;

  @IsString()
  bankName: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
