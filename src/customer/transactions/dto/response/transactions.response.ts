import { Exclude, Expose, Type } from 'class-transformer';
import { UserResponse } from 'src/user/dto/response/user.response';

@Exclude()
export class TransactionsResponse {
  @Expose()
  id: number;

  @Expose()
  userId: number;

  @Expose()
  txId: string;

  @Expose()
  amount: number;

  @Expose()
  network: string;

  @Expose()
  plan: string;

  @Expose()
  recipient: string;

  @Expose()
  status: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => UserResponse)
  user: UserResponse;
}
