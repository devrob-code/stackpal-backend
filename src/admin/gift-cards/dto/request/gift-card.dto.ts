import { IsInt, IsOptional, IsString } from 'class-validator';

export class GiftCardDto {
  @IsString()
  cardType: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsInt()
  physicalRate: number;

  @IsInt()
  eCodeRate: number;

  @IsInt()
  denomination: number;
}

export class UpdateGiftCardDto {
  @IsString()
  @IsOptional()
  cardType?: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsInt()
  @IsOptional()
  physicalRate?: number;

  @IsInt()
  @IsOptional()
  eCodeRate?: number;

  @IsInt()
  @IsOptional()
  denomination?: number;
}
