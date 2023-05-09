import { AirtimeDataTypes } from 'src/customer/transactions/transactions.constants';
import { User } from 'src/repositories/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('airtimeDataTransactions')
export class AirtimeDataTransactions {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('varchar')
  txId: string;

  @Column('int')
  userId: number;

  @Column('bigint')
  amount: number;

  @Column('varchar')
  network: string;

  @Column('text')
  plan: string;

  @Column('varchar')
  recipient: string;

  @Column('varchar')
  billerTxId: string;

  @Column('varchar')
  status: string;

  @Column({ type: 'enum', enum: AirtimeDataTypes })
  type: AirtimeDataTypes;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.airtimeDataTransactions)
  user: User;
}
