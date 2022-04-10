import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateUserDataDto {
  @IsBoolean()
  @IsOptional()
  emailVerified: boolean;

  @IsBoolean()
  @IsOptional()
  phoneVerified: boolean;
}
