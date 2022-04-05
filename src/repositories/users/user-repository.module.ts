import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { GetUserByEmailUseCase } from './usecases/get-user-by-email.usecase';
import { UserRepositoryService } from './user-repository.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserRepositoryService, GetUserByEmailUseCase],
  exports: [UserRepositoryService],
})
export class UserRepositoryModule {}
