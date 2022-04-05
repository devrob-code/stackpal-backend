import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/request/create-user.dto';
import { User } from './entities/user.entity';
import { CreateUserUseCase } from './usecases/create-user.usecase';
import { GetUserByEmailUseCase } from './usecases/get-user-by-email.usecase';
import { GetUserByUsernameUseCase } from './usecases/get-user-by-username.usecase';

@Injectable()
export class UserRepositoryService {
  constructor(
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
    private readonly getUserByUsernameUseCase: GetUserByUsernameUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  public async getByEmail(email: string): Promise<User> {
    return this.getUserByEmailUseCase.exec(email);
  }

  public async getByUsername(username: string): Promise<User> {
    return this.getUserByUsernameUseCase.exec(username);
  }

  public async createUser(body: CreateUserDto): Promise<User> {
    return this.createUserUseCase.exec(body);
  }
}
