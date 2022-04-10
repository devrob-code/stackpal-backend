import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDataDto } from 'src/user/dto/request/user-data.dto';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UpdateUserByEmailUseCase {
  constructor(
    @InjectRepository(User) private readonly cartRepo: Repository<User>,
  ) {}

  public async exec(email: string, data: Partial<User>): Promise<boolean> {
    const updateCartItems = await this.cartRepo
      .createQueryBuilder()
      .update(User)
      .set(data)
      .where('email = :email', { email })
      .execute();

    return !!updateCartItems;
  }
}
