import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { GiftCardDepositType } from '../../gift-card.constants';

export class GiftCardDepositDto {
  @IsEnum(GiftCardDepositType)
  type: GiftCardDepositType;

  @IsInt()
  denomination: number;

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
}
