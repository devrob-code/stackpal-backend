import { Exclude, Expose, Type } from 'class-transformer';
import { UserResponse } from 'src/user/dto/response/user.response';

@Exclude()
export class GiftCardResponse {
  @Expose()
  id: number;

  @Expose()
  adminId: number;

  @Expose()
  cardType: string;

  @Expose()
  imageUrl: string;

  @Expose()
  physicalRate: number;

  @Expose()
  eCodeRate: number;

  @Expose()
  denomination: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => UserResponse)
  user: UserResponse[];
}
