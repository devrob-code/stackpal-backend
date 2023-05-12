import { Exclude, Expose, Type } from 'class-transformer';
import { UserResponse } from 'src/user/dto/response/user.response';

@Exclude()
export class GiftCardResponse {
  @Expose()
  id: number;

  @Expose()
  adminId: number;

  @Expose()
  name: string;

  @Expose()
  imageUrl: string;

  @Expose()
  country: string;

  @Expose()
  physicalFastRate: number;

  @Expose()
  physicalSlowRate: number;

  @Expose()
  ecodeFastRate: number;

  @Expose()
  ecodeSlowRate: number;

  @Expose()
  receiptType: string;

  @Expose()
  receiptImageUrl: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => UserResponse)
  user: UserResponse[];
}

export class GiftCardResponseDto {
  @Expose()
  status: boolean;

  @Expose()
  data: GiftCardResponse[];
}
