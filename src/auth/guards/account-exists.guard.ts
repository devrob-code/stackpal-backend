import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UserRepositoryService } from 'src/repositories/users/user-repository.service';

@Injectable()
export class AccountExistsGuard implements CanActivate {
  constructor(private readonly userRepo: UserRepositoryService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const email = request.body.email;
    const user = await this.userRepo.getByEmail(email);

    if (!user) {
      throw new HttpException('Invalid Account', HttpStatus.BAD_REQUEST);
    }

    return true;
  }
}
