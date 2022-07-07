import { Exclude, Expose, Type } from 'class-transformer';
import { CurrencyResponse } from 'src/customer/currency/dto/response/currency.response';
import { UserResponse } from 'src/user/dto/response/user.response';

@Exclude()
export class WalletResponse {
  @Expose()
  id: number;

  @Expose()
  userId: number;

  @Expose()
  currencyId: number;

  @Expose()
  balance: number;

  @Expose()
  isLocked: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => UserResponse)
  user: UserResponse;

  @Expose()
  @Type(() => CurrencyResponse)
  currency: CurrencyResponse;
}
