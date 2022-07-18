import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/request/create-user.dto';
import { User } from './entities/user.entity';
import { CreateUserUseCase } from './usecases/create-user.usecase';
import { CreateUserWalletUseCase } from '../wallets/usecases/create-user-wallet.usecase';
import { GetUserByPhoneUseCase } from './usecases/get-user-by-phone.usecase';
import { GetUserByEmailAndIdUseCase } from './usecases/get-user-by-email-and-id.usecase';
import { GetUserByEmailUseCase } from './usecases/get-user-by-email.usecase';
import { GetUserByUsernameUseCase } from './usecases/get-user-by-username.usecase';
import { UpdateUserByEmailUseCase } from './usecases/update-user-by-email.usecase';
import { GetIdByUserDataUsecase } from './usecases/get-user-id-by-user-data.usecase';

@Injectable()
export class UserRepositoryService {
  constructor(
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
    private readonly getUserByUsernameUseCase: GetUserByUsernameUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly createUserWalletUseCase: CreateUserWalletUseCase,
    private readonly getUserByEmailAndIdUseCase: GetUserByEmailAndIdUseCase,
    private readonly updateUserByEmailUseCase: UpdateUserByEmailUseCase,
    private readonly getUserByPhoneUseCase: GetUserByPhoneUseCase,
    private readonly getIdByUserDataUsecase: GetIdByUserDataUsecase,
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
    const createdUser = await this.createUserUseCase.exec(body);
    body.walletData.map(eData => {
      const createWalletData = {
        userId: createdUser.id,
        currencyId: 1,
        balance:0,
        isLocked:true,
        network: eData.network,
        address: eData.address,
        private_key: eData.privateKey
      }
      this.createUserWalletUseCase.exec(createWalletData);
    });
    return createdUser;
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

  public async getIdByUserData(userData: string): Promise<number> {
    return this.getIdByUserDataUsecase.exec(userData);
  }
}
