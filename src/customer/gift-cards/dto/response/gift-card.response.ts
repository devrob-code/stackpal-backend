import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { UserResponse } from 'src/user/dto/response/user.response';

@Exclude()
export class GiftCardResponse {
  @Expose()
  id: number;

  @Expose()
  userId: number;

  @Expose()
  cardNo: string;

  @Expose()
  imageUrl: string;

  @Expose()
  isApproved: boolean;

  @Expose()
  approvedBy: number;

  @Expose()
  rate: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => UserResponse)
  user: UserResponse[];
}
