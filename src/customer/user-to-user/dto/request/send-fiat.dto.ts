import { IsEnum, IsInt } from 'class-validator';
import { FiatTransactionsType } from 'src/customer/transactions/transactions.constants';
import { WalletAction } from 'src/customer/wallet/wallet.constants';

export class SendFiatDto {
  @IsInt()
  receiverId: number;

  @IsInt()
  amount: number;

  @IsInt()
  currencyId: number;

  @IsEnum(WalletAction)
  action: WalletAction;

  @IsEnum(FiatTransactionsType)
  type: FiatTransactionsType;
}
