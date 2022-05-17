import { Injectable } from '@nestjs/common';
import { WalletRepositoryService } from 'src/repositories/wallets/wallet-repository.service';

@Injectable()
export class WalletService {
  constructor(
    private readonly walletRepositoryService: WalletRepositoryService,
  ) {}
}
