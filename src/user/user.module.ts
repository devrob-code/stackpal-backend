import { Module } from '@nestjs/common';
import { UserRepositoryModule } from 'src/repositories/users/user-repository.module';

@Module({
  imports: [UserRepositoryModule],
  controllers: [],
  providers: [],
})
export class UserModule {}
