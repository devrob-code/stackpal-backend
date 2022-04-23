import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { CurrencyTypes } from '../../currency.constants';

export class CurrencyQueryDto {
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => JSON.parse(value.toLowerCase()))
  active?: boolean = null;

  @IsEnum(CurrencyTypes)
  @IsOptional()
  type?: CurrencyTypes = null;
}
