import { IsEnum, IsInt, IsString } from 'class-validator';
import { TVNetworkTypes } from '../../bills.constants';

export class PurchaseTVSubscriptionDto {
  @IsString()
  billersCode: string;

  @IsInt()
  amount: number;

  @IsString()
  phone: string;

  @IsEnum(TVNetworkTypes)
  network: TVNetworkTypes;

  @IsString()
  variationCode: string;
}
