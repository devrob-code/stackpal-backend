import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WithdrawalRequest } from './entities/withdrawal-requests.entity';
import { WithdrawalRequestRepositoryService } from './withdrawal-request.repository.service';
import { AddNewWithdrawalRequestUseCase } from './usecases/add-new-withdrawal-request';
import { GetAllWithdrawalRequestByUserIdUseCase } from './usecases/get-all-withdrawal-request-by-user-id.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([WithdrawalRequest])],
  providers: [
    WithdrawalRequestRepositoryService,
    AddNewWithdrawalRequestUseCase,
    GetAllWithdrawalRequestByUserIdUseCase,
  ],
  exports: [WithdrawalRequestRepositoryService],
})
export class WithdrawalRequestRepositoryModule {}
