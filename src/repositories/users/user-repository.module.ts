import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Wallet } from '../wallets/entities/wallet.entity';
import { CreateUserUseCase } from './usecases/create-user.usecase';
import { CreateUserWalletUseCase } from '../wallets/usecases/create-user-wallet.usecase';
import { GetUserByPhoneUseCase } from './usecases/get-user-by-phone.usecase';
import { GetUserByEmailAndIdUseCase } from './usecases/get-user-by-email-and-id.usecase';
import { GetUserByEmailUseCase } from './usecases/get-user-by-email.usecase';
import { GetUserByUsernameUseCase } from './usecases/get-user-by-username.usecase';
import { UpdateUserByEmailUseCase } from './usecases/update-user-by-email.usecase';
import { UserRepositoryService } from './user-repository.service';
import { GetIdByUserDataUsecase } from './usecases/get-user-id-by-user-data.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Wallet]),
  ],
  providers: [
    UserRepositoryService,
    GetUserByEmailUseCase,
    GetUserByUsernameUseCase,
    CreateUserUseCase,
    CreateUserWalletUseCase,
    GetUserByEmailAndIdUseCase,
    UpdateUserByEmailUseCase,
    GetUserByPhoneUseCase,
    GetIdByUserDataUsecase,
  ],
  exports: [
    UserRepositoryService
  ],
})
export class UserRepositoryModule {}
