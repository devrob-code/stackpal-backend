import { User } from 'src/repositories/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
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

  @OneToMany(() => User, (user) => user.fiatDeposit)
  user: User[];
}
