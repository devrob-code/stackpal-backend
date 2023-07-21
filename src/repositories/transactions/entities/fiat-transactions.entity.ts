import { AirtimeDataTypes, FiatTransactionsType } from 'src/customer/transactions/transactions.constants';
import { User } from 'src/repositories/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('fiatTransactions')
export class FiatTransactions {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('varchar')
  txId: string;

  @Column('int')
  userId: number;

  @Column('bigint')
  amount: number;

  @Column({ type: 'enum', enum: FiatTransactionsType })
  type: FiatTransactionsType;

  @Column('int')
  p2pAccountId: number;

  @Column('int')
  receiverBankId: number;

  @Column({ type: 'timestamp' })
  transactionDate: String;

  @Column('int')
  senderId: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
