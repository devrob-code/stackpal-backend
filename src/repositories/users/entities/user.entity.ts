import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRoles } from 'src/user/user.constants';
import { Wallet } from 'src/repositories/wallets/entities/wallet.entity';
import { FiatDeposit } from 'src/repositories/fiat-deposits/entities/fiat-deposit.entity';
import { P2PAccount } from 'src/repositories/p2p-accounts/entities/p2p-account.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('varchar')
  email: string;

  @Column('varchar')
  password: string;
  @BeforeInsert() async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @Column('varchar')
  phone: string;

  @Column('varchar')
  username: string;

  @Column('varchar')
  firstName: string;

  @Column('varchar')
  lastName: string;

  @Column('boolean')
  emailVerified: boolean;

  @Column('boolean')
  phoneVerified: boolean;

  @Column({ type: 'enum', enum: UserRoles })
  role: UserRoles;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => Wallet, (wallet) => wallet.user)
  wallet: Wallet[];

  @OneToMany(() => FiatDeposit, (fiatDeposit) => fiatDeposit.user)
  fiatDeposit: FiatDeposit[];

  @OneToMany(() => P2PAccount, (p2pAccounts) => p2pAccounts.user)
  p2pAccounts: P2PAccount[];
}
