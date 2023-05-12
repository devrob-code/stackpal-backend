import { IsInt, IsOptional, IsString } from 'class-validator';

export class GiftCardDto {
  @IsString()
  name: string;

  @IsString()
  imageUrl: string;

  @IsString()
  country: string;

  @IsInt()
  physicalFastRate: number;

  @IsInt()
  physicalSlowRate: number;

  @IsInt()
  ecodeFastRate: number;

  @IsInt()
  ecodeSlowRate: number;

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
