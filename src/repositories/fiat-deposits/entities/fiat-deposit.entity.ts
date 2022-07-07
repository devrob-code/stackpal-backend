import { P2PAccount } from 'src/repositories/p2p-accounts/entities/p2p-account.entity';
import { User } from 'src/repositories/users/entities/user.entity';
import { Wallet } from 'src/repositories/wallets/entities/wallet.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('fiatDeposits')
export class FiatDeposit {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('int')
  userId: number;

  @Column('int')
  p2pAccountId: number;

  @Column('bigint')
  amount: number;

  @Column('boolean')
  isApproved: boolean;

  @Column('int')
  approvedBy: number;

  @Column('int')
  walletId: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.fiatDeposit)
  user: User[];

  @ManyToOne(() => P2PAccount, (p2pAccount) => p2pAccount.fiatDeposit)
  p2pAccount: P2PAccount[];

  @ManyToOne(() => Wallet, (wallet) => wallet.fiatDeposit)
  wallet: Wallet[];
}
