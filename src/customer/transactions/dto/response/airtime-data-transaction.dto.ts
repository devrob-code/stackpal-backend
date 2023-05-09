import { Exclude, Expose, Type } from 'class-transformer';
import { UserResponse } from 'src/user/dto/response/user.response';

@Exclude()
export class AirtimeDataTransactionResponse {
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
