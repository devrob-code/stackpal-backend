import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';

@Injectable()
export class GetUserByIdUseCase {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}

  public async exec(id: number): Promise<User> {
    return this.userRepo.findOne({
      where: {
        id,
      },
    });
  }
}
