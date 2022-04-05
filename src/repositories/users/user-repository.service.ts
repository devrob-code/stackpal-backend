import { Injectable } from '@nestjs/common';
import { GetUserByEmailUseCase } from './usecases/get-user-by-email.usecase';

@Injectable()
export class UserRepositoryService {
  constructor(private readonly getUserByEmailUseCase: GetUserByEmailUseCase) {}

  public async getByEmail(email: string): Promise<any> {
    return this.getUserByEmailUseCase.exec(email);
  }
}
