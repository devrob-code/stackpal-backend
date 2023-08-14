import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CurrencyTypes } from 'src/customer/currency/currency.constants';
import { WalletRepositoryService } from 'src/repositories/wallets/wallet-repository.service';

@Injectable()
export class CheckIfWalletIsFiatGuard implements CanActivate {
  constructor(private readonly walletRepo: WalletRepositoryService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const id = request.body.walletId;

    if (id) {
      const wallet = await this.walletRepo.getById(id);

      if (wallet.currency.type !== CurrencyTypes.fiat) {
        throw new HttpException('Wallet Type is not Fiat', HttpStatus.BAD_REQUEST);
      }

      return true;
    }

    return true;
  }
}
