import { IsEmail, IsString, IsArray, IsOptional } from 'class-validator';

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

  @IsOptional()
  phone?: string;

  @IsOptional()
  dob?: string;
}
