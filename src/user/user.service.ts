import { Injectable } from '@nestjs/common';
import { UserRepositoryService } from 'src/repositories/users/user-repository.service';

@Injectable()
export class UserService {
  constructor(private readonly userRepositoryService: UserRepositoryService) {}

  public async checkUsernameExists(username: string): Promise<boolean> {
    const usernameExists = await this.userRepositoryService.getByUsername(username);
    return usernameExists ? true : false;
  }

  public async checkEmailExists(email: string): Promise<boolean> {
    const emailExists = await this.userRepositoryService.getByEmail(email);
    return emailExists ? true : false;
  }
}
