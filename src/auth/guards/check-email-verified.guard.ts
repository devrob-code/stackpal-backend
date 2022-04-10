import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UserRepositoryService } from 'src/repositories/users/user-repository.service';

@Injectable()
export class CheckEmailVerifiedGuard implements CanActivate {
  constructor(private readonly userRepo: UserRepositoryService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const email = request.body.email;
    const user = await this.userRepo.getByEmail(email);

    if (user.emailVerified === false) {
      throw new HttpException(
        'Account not fully verified to access this service',
        HttpStatus.FORBIDDEN,
      );
    }

    return true;
  }
}
