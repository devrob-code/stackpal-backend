import { IsEnum, IsInt, IsString } from 'class-validator';
import { EducationTypes, ElectricityNetworkTypes, ElectricityPaymentTypes } from '../../bills.constants';

export class PurchaseEducationDto {
  @IsInt()
  amount: number;

  @IsString()
  phone: string;

  @IsEnum(EducationTypes)
  network: EducationTypes;

  @IsString()
  variationCode: string;
}
