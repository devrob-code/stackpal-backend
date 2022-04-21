import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateCurrencyDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  alias?: string;

  @IsString()
  @IsOptional()
  logo?: string;

  @IsString()
  @IsOptional()
  price?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
