import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserUseCase } from './usecases/create-user.usecase';
import { GetUserByEmailAndIdUseCase } from './usecases/get-user-by-email-and-id.usecase';
import { GetUserByEmailUseCase } from './usecases/get-user-by-email.usecase';
import { GetUserByUsernameUseCase } from './usecases/get-user-by-username.usecase';
import { UserRepositoryService } from './user-repository.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UserRepositoryService,
    GetUserByEmailUseCase,
    GetUserByUsernameUseCase,
    CreateUserUseCase,
    GetUserByEmailAndIdUseCase,
  ],
  exports: [UserRepositoryService],
})
export class UserRepositoryModule {}
