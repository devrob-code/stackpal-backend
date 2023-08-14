import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CurrencyTypes } from 'src/customer/currency/currency.constants';
import { WalletRepositoryService } from 'src/repositories/wallets/wallet-repository.service';

@Injectable()
export class CheckIfWalletIsUserWalletGuard implements CanActivate {
  constructor(private readonly walletRepo: WalletRepositoryService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const id = request.body.walletId;

    if (id) {
      const userId = request.user.id;
      const wallet = await this.walletRepo.getByIdAndUserId(id, userId);

      if (!wallet) {
        throw new HttpException('You do not have permission to make this request', HttpStatus.FORBIDDEN);
      }

      return true;
    }

    return true;
  }
}
