import { IsInt, IsOptional, IsString } from 'class-validator';

export class GiftCardDto {
  @IsString()
  cardType?: string;

  @IsString()
  @IsOptional()
  imageUrl: string;

  @IsInt()
  physicalRate: number;

  @IsInt()
  eCodeRate: number;

  @IsInt()
  denomination: number;
}
