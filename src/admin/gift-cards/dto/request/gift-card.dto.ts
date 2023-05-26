import { IsInt, IsOptional, IsString } from 'class-validator';

export class GiftCardDto {
  @IsString()
  name: string;

  @IsString()
  imageUrl: string;

  @IsString()
  country: string;

  @IsOptional()
  @IsInt()
  physicalFastRate: number;

  @IsOptional()
  @IsInt()
  physicalSlowRate: number;

  @IsOptional()
  @IsInt()
  ecodeFastRate: number;

  @IsOptional()
  @IsInt()
  ecodeSlowRate: number;

  @IsOptional()
  @IsString()
  denominationRange: string;

  @IsOptional()
  @IsString()
  receiptType: string;
}

export class UpdateGiftCardDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsInt()
  @IsOptional()
  physicalFastRate?: number;

  @IsInt()
  @IsOptional()
  physicalSlowRate?: number;

  @IsInt()
  @IsOptional()
  ecodeFastRate?: number;

  @IsInt()
  @IsOptional()
  ecodeSlowRate?: number;

  @IsString()
  @IsOptional()
  denominationRange?: string;
}
