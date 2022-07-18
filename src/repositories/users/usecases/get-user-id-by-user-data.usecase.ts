import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class GetIdByUserDataUsecase {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  public async exec(userData: string): Promise<number> {
    const userId = await this.userRepo
    .createQueryBuilder("users")
    .where({ email: userData })
    .orWhere({username: userData})
    .select(["users.id"])
    .getOne();
    return userId.id;
  }
}
