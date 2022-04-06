import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UserRepositoryService } from 'src/repositories/users/user-repository.service';

@Injectable()
export class UsernameExistsGuard implements CanActivate {
  constructor(private readonly userRepo: UserRepositoryService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const username = request.body.username;
    const usernameExists = await this.userRepo.getByUsername(username);

    if (usernameExists) {
      throw new HttpException(
        'Username already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    return true;
  }
}
