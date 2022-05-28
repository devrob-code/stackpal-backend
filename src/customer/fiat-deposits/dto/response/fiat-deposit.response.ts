import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class FiatDepositResponse {
  @Expose()
  id: number;

  @Expose()
  userId: number;

  @Expose()
  p2pAccountId: number;

  @Expose()
  amount: number;

  @Expose()
  isApproved: boolean;

  @Expose()
  walletId: number;

  @Expose()
  approvedBy: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
