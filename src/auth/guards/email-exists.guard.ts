import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UserRepositoryService } from 'src/repositories/users/user-repository.service';

@Injectable()
export class EmailExistsGuard implements CanActivate {
  constructor(private readonly userRepo: UserRepositoryService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const email = request.body.email;
    const emailExists = await this.userRepo.getByEmail(email);

    if (emailExists) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }

    return true;
  }
}
