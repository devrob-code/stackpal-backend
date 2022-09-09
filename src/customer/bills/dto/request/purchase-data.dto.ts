import { IsEnum, IsOptional, IsString } from 'class-validator';
import { DataNetworkTypes } from '../../bills.constants';

export class PurchaseDataDto {
  @IsString()
  variationCode: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  billersCode?: string;

  @IsEnum(DataNetworkTypes)
  network: DataNetworkTypes;
}
