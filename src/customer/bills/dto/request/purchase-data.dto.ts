import { IsEnum, IsInt, IsString } from 'class-validator';
import { DataNetworkTypes, NetworkTypes } from '../../bills.constants';

export class PurchaseDataDto {
  @IsString()
  variationCode: string;

  @IsString()
  phone: string;

  @IsEnum(DataNetworkTypes)
  network: DataNetworkTypes;
}
