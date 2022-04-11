import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';

@Injectable()
export class GetUserByPhoneUseCase {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  public async exec(phone: string): Promise<User> {
    return this.userRepo.findOne({
      where: {
        phone,
      },
    });
  }
}
