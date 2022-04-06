import { Module } from '@nestjs/common';
import { UserRepositoryModule } from 'src/repositories/users/user-repository.module';
import { UserController } from './user.controller';

@Module({
  imports: [UserRepositoryModule],
  controllers: [UserController],
  providers: [],
})
export class UserModule {}
