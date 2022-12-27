import { IsEmail, IsString, IsArray, IsOptional } from 'class-validator';

interface Wallet {
  network: string;
  address: string;
  privateKey: string;
}

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;

  @IsOptional()
  transactionPin?: string;
}
