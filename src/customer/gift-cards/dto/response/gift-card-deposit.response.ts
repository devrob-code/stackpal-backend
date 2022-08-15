import { Exclude, Expose, Type } from 'class-transformer';
import { UserResponse } from 'src/user/dto/response/user.response';
import { GiftCardDepositType } from '../../gift-card.constants';

@Exclude()
export class GiftCardDepositResponse {
  @Expose()
  id: number;

  @Expose()
  userId: number;

  @Expose()
  type: GiftCardDepositType;

  @Expose()
  denomination: number;

  @Expose()
  isApproved: boolean;

  @Expose()
  approvedBy: number;

  @Expose()
  approvalRate: number;

  @Expose()
  isCredited: boolean;

  @Expose()
  cardImageUrl: string;

  @Expose()
  code: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => UserResponse)
  user: UserResponse[];
}
