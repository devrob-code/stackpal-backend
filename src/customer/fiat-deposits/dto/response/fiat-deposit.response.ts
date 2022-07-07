import { Exclude, Expose, Type } from 'class-transformer';
import { WalletResponse } from 'src/customer/wallet/dto/response/wallet.response';
import { P2PAccountResponse } from 'src/repositories/p2p-accounts/response/p2p-account.response';
import { UserResponse } from 'src/user/dto/response/user.response';

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

  @Expose()
  @Type(() => UserResponse)
  user: UserResponse[];

  @Expose()
  @Type(() => P2PAccountResponse)
  p2pAccount: P2PAccountResponse[];

  @Expose()
  @Type(() => WalletResponse)
  wallet: WalletResponse[];
}
