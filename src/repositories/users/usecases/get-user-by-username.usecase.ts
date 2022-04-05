import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';

@Injectable()
export class GetUserByUsernameUseCase {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  public async exec(username: string): Promise<any> {
    return this.userRepo.findOne({
      where: {
        username,
      },
    });
  }
}
