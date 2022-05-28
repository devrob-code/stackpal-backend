import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { P2PAccountRepositoryService } from 'src/repositories/p2p-accounts/p2p-account-repository.service';

@Injectable()
export class CheckP2PAccountIdExistsGuard implements CanActivate {
  constructor(private readonly p2pAccountRepo: P2PAccountRepositoryService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const p2pAccountId = request.params.id || request.body.p2pAccountId;

    if (p2pAccountId === null) {
      throw new NotFoundException();
    }

    const p2pAccountIdExists = await this.p2pAccountRepo.getP2PAccountById(
      p2pAccountId,
    );

    if (!p2pAccountIdExists) {
      throw new HttpException('P2P Account not found.', 404);
    }

    return true;
  }
}
