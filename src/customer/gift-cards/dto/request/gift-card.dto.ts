import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class GiftCardDto {
  @IsInt()
  @IsOptional()
  userId?: number;

  @IsString()
  @IsOptional()
  cardNo: string;

  @IsString()
  @IsOptional()
  imageUrl: string;

  @IsBoolean()
  @IsOptional()
  isApproved: boolean;

  @IsInt()
  @IsOptional()
  approvedBy: number;

  @IsInt()
  @IsOptional()
  rate: number;
}
