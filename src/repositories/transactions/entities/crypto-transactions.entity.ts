import { CryptoTransactionSendType, CryptoTransactionsType } from 'src/customer/transactions/transactions.constants';
import { User } from 'src/repositories/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('cryptoTransactions')
export class CryptoTransactions {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('varchar')
  txId: string;

  @Column('varchar')
  blockchainTxId: string;

  @Column('int')
  userId: number;

  @Column('bigint')
  amount: number;

  @Column('varchar')
  network: string;

  @Column({ type: 'enum', enum: CryptoTransactionsType })
  type: CryptoTransactionsType;

  @Column({ type: 'enum', enum: CryptoTransactionSendType })
  sendType: CryptoTransactionSendType;

  @Column('varchar')
  senderWalletAddress: string;

  @Column('varchar')
  receiverWalletAddress: string;

  @Column('varchar')
  blockTime: string;

  @Column({ type: 'timestamp' })
  transactionDate: String;

  @Column({ type: 'int' })
  receiverId: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.cryptoTransactions)
  user: User[];

  @ManyToOne(() => User, (user) => user.cryptoTransactions)
  @JoinColumn({ name: 'receiverId', referencedColumnName: 'id' })
  receiver: User[];
}
