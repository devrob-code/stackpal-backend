import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDataDto } from 'src/user/dto/request/user-data.dto';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UpdateUserByEmailUseCase {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  public async exec(email: string, data: Partial<User>): Promise<boolean> {
    const updateUser = await this.userRepo
      .createQueryBuilder()
      .update(User)
      .set(data)
      .where('email = :email', { email })
      .execute();

    return !!updateUser;
  }
}
