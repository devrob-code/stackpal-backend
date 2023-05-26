import { IsInt, IsOptional, IsString } from 'class-validator';

export class GiftCardReceiptDto {
  @IsInt()
  @IsOptional()
  giftCardId: number;

  @IsString()
  giftCardName: string;

  @IsString()
  name: string;

  @IsInt()
  rate: number;
}
