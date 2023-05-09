import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { UserResponse } from 'src/user/dto/response/user.response';

@Exclude()
export class ElectricityTransactionResponse {
  @Expose()
  id: number;

  @Expose()
  userId: number;

  @Expose()
  txId: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => UserResponse)
  user: UserResponse;
}
