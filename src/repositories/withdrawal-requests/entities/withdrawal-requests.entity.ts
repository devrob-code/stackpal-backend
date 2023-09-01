import { BankTypesEnum } from 'src/customer/banks/banks.constants';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('withdrawalRequests')
export class WithdrawalRequest {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('int')
  userId: number;

  @Column('int')
  bankAccountId: number;

  @Column('int')
  amount: number;

  @Column('boolean')
  userCredited: boolean;

  @Column('varchar')
  transactionId: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
