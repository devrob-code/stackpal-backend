import { IsBoolean, IsEmail, IsString } from 'class-validator';

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
}
