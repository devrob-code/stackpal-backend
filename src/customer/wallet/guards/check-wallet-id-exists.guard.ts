import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CurrencyTypes } from 'src/customer/currency/currency.constants';
import { WalletRepositoryService } from 'src/repositories/wallets/wallet-repository.service';

@Injectable()
export class CheckWalletIdExistsGuard implements CanActivate {
  constructor(private readonly walletRepo: WalletRepositoryService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const id = request.params.walletId || request.body.walletId;

    if (id) {
      const wallet = await this.walletRepo.getById(id);

      if (!wallet) {
        throw new HttpException('Wallet Not Found', HttpStatus.NOT_FOUND);
      }

      return true;
    }
    return true;
  }
}
