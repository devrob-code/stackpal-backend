import { IsNotEmpty } from 'class-validator';

export class UserDataDto {
  @IsNotEmpty()
  userInfo: string;
}
