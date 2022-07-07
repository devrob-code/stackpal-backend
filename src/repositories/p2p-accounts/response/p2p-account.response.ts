import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { UserResponse } from 'src/user/dto/response/user.response';

@Exclude()
export class P2PAccountResponse {
  @Expose()
  id: number;

  @Expose()
  createdBy: number;

  @Expose()
  accountName: string;

  @Expose()
  accountNumber: string;

  @Expose()
  bankName: string;

  @Expose()
  isActive: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => UserResponse)
  user: UserResponse;
}
