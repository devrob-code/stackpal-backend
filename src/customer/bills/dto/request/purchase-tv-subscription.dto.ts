import { IsEnum, IsInt, IsString } from 'class-validator';
import { DataNetworkTypes } from '../../bills.constants';

export class PurchaseTVSubscriptionDto {
  @IsString()
  billersCode: string;

  @IsInt()
  amount: number;

  @IsString()
  phone: string;

  @IsEnum(DataNetworkTypes)
  network: DataNetworkTypes;
}
