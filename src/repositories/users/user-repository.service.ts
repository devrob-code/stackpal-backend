import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/request/create-user.dto';
import { UpdateUserDataDto } from 'src/user/dto/request/user-data.dto';
import { User } from './entities/user.entity';
import { CreateUserUseCase } from './usecases/create-user.usecase';
import { GetUserByPhoneUseCase } from './usecases/get-user-by-phone.usecase';
import { GetUserByEmailAndIdUseCase } from './usecases/get-user-by-email-and-id.usecase';
import { GetUserByEmailUseCase } from './usecases/get-user-by-email.usecase';
import { GetUserByUsernameUseCase } from './usecases/get-user-by-username.usecase';
import { UpdateUserByEmailUseCase } from './usecases/update-user-by-email.usecase';

@Injectable()
export class UserRepositoryService {
  constructor(
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
    private readonly getUserByUsernameUseCase: GetUserByUsernameUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserByEmailAndIdUseCase: GetUserByEmailAndIdUseCase,
    private readonly updateUserByEmailUseCase: UpdateUserByEmailUseCase,
    private readonly getUserByPhoneUseCase: GetUserByPhoneUseCase,
  ) {}

  public async getByEmail(email: string): Promise<User> {
    return this.getUserByEmailUseCase.exec(email);
  }

  public async getByUsername(username: string): Promise<User> {
    return this.getUserByUsernameUseCase.exec(username);
  }

  public async getByPhone(phone: string): Promise<User> {
    return this.getUserByPhoneUseCase.exec(phone);
  }

  public async createUser(body: CreateUserDto): Promise<User> {
    return this.createUserUseCase.exec(body);
  }

  public async getByEmailAndId(email: string, id: number): Promise<User> {
    return this.getUserByEmailAndIdUseCase.exec(email, id);
  }

  public async updateUserByEmail(
    email: string,
    data: Partial<User>,
  ): Promise<boolean> {
    return this.updateUserByEmailUseCase.exec(email, data);
  }
}
