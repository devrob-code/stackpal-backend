import { Exclude, Expose, Type } from 'class-transformer';
import { UserResponse } from 'src/user/dto/response/user.response';
import { GiftCardDepositType } from '../../gift-card.constants';

@Exclude()
export class GiftCardDepositResponseData {
  @Expose()
  id: number;

  @Expose()
  userId: number;

  @Expose()
  type: GiftCardDepositType;

  @Expose()
  denomination: string;

  @Expose()
  cardName: string;

  @Expose()
  cardWorth: number;

  @Expose()
  speed: string;

  @Expose()
  rate: number;

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

  @Expose()
  transactionId?: string;

  @Expose()
  amount?: number;
}

@Exclude()
export class GiftCardDepositResponse {
  @Expose()
  status: boolean;

  @Expose()
  data: GiftCardDepositResponseData[];
}
