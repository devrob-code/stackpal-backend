import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  public async exec(user: Partial<User>): Promise<User> {
    const newUser: User = this.userRepo.merge(new User(), user);

    return this.userRepo.save(newUser);
  }
}
