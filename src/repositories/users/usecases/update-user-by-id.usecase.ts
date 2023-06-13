import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDataDto } from 'src/user/dto/request/user-data.dto';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UpdateUserByIdUseCase {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}

  public async exec(id: number, data: Partial<User>): Promise<boolean> {
    const updateUser = await this.userRepo
      .createQueryBuilder()
      .update(User)
      .set(data)
      .where('id = :id', { id })
      .execute();

    return !!updateUser;
  }
}
