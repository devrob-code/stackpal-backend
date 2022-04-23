import { IsBoolean, IsEnum, IsString } from 'class-validator';
import { CurrencyTypes } from 'src/customer/currency/currency.constants';

export class NewCurrencyDto {
  @IsString()
  name: string;

  @IsString()
  alias: string;

  @IsString()
  logo: string;

  @IsString()
  price: string;

  @IsBoolean()
  isActive: boolean;

  @IsEnum(CurrencyTypes)
  type: CurrencyTypes;
}
