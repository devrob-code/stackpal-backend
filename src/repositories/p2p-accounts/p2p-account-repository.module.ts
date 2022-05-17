import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { P2PAccount } from './entities/p2p-account.entity';
import { P2PAccountRepositoryService } from './p2p-account-repository.service';
import { AddNewP2PAccountUseCase } from './usecases/add-new-p2p-account.usecase';
import { GetP2PAccountByIdUseCase } from './usecases/get-p2p-account-by-id.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([P2PAccount])],
  providers: [
    P2PAccountRepositoryService,
    AddNewP2PAccountUseCase,
    GetP2PAccountByIdUseCase,
  ],
  exports: [P2PAccountRepositoryService],
})
export class P2PAccountRepositoryModule {}
