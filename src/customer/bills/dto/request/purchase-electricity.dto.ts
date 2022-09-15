import { IsEnum, IsInt, IsString } from 'class-validator';
import { ElectricityNetworkTypes, ElectricityPaymentTypes } from '../../bills.constants';

export class PurchaseElectricityDto {
  @IsString()
  billersCode: string;

  @IsInt()
  amount: number;

  @IsString()
  phone: string;

  @IsEnum(ElectricityNetworkTypes)
  network: ElectricityNetworkTypes;

  @IsString()
  variationCode: ElectricityPaymentTypes;
}
