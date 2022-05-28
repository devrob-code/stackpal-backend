import { IsBoolean, IsInt, IsOptional } from 'class-validator';

export class UpdateFiatDepositDto {
  @IsOptional()
  @IsInt()
  approvedBy?: number;

  @IsBoolean()
  isApproved: boolean;
}
