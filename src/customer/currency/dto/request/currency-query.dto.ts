import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CurrencyQueryDto {
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => JSON.parse(value.toLowerCase()))
  active?: boolean = null;
}
