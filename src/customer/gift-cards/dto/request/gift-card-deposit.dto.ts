import { IsBoolean, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { GiftCardDepositType } from '../../gift-card.constants';

export class GiftCardDepositDto {
  @IsEnum(GiftCardDepositType)
  type: GiftCardDepositType;

  @IsString()
  denomination: string;

  @IsBoolean()
  @IsOptional()
  isApproved?: boolean;

  @IsInt()
  @IsOptional()
  approvedBy?: number;

  @IsInt()
  @IsOptional()
  approvalRate: number;

  @IsBoolean()
  @IsOptional()
  isCredited?: boolean;

  @IsString()
  @IsOptional()
  cardImageUrl?: string;

  @IsString()
  @IsOptional()
  code?: string;

  @IsString()
  @IsOptional()
  cardName?: string;

  @IsInt()
  @IsOptional()
  cardWorth?: number;

  @IsInt()
  @IsOptional()
  giftCardId?: number;

  @IsString()
  @IsOptional()
  speed?: string;

  @IsInt()
  @IsOptional()
  rate: number;
}
