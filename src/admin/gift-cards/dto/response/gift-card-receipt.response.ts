import { Exclude, Expose, Type } from 'class-transformer';
import { UserResponse } from 'src/user/dto/response/user.response';

@Exclude()
export class GiftCardReceiptResponse {
  @Expose()
  id: number;

  @Expose()
  giftCardId: number;

  @Expose()
  giftCardName: string;

  @Expose()
  name: string;

  @Expose()
  rate: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
