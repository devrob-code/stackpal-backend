import { IsEnum, IsInt, IsString } from 'class-validator';
import { NetworkTypes } from '../../bills.constants';

export class PurchaseAirtimeDto {
  @IsInt()
  amount: number;

  @IsString()
  phone: string;

  @IsEnum(NetworkTypes)
  network: NetworkTypes;
}
