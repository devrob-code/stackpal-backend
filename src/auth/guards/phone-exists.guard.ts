import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UserRepositoryService } from 'src/repositories/users/user-repository.service';

@Injectable()
export class PhoneExistsGuard implements CanActivate {
  constructor(private readonly userRepo: UserRepositoryService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const phone = request.body.phone;
    const phoneExists = await this.userRepo.getByPhone(phone);

    if (phoneExists) {
      throw new HttpException(
        'Phone number already associated with another user',
        HttpStatus.BAD_REQUEST,
      );
    }

    return true;
  }
}
