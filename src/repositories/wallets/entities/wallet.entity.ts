import { Currency } from 'src/repositories/currencies/entities/currency.entity';
import { FiatDeposit } from 'src/repositories/fiat-deposits/entities/fiat-deposit.entity';
import { User } from 'src/repositories/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('wallets')
export class Wallet {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('int')
  userId: number;

  @Column('int')
  currencyId: number;

  @Column('bigint')
  balance: number;

  @Column('boolean')
  isLocked: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.wallet)
  user: User;

  @ManyToOne(() => Currency, (currency) => currency.wallet)
  currency: Currency;

  @OneToMany(() => FiatDeposit, (fiatDeposit) => fiatDeposit.p2pAccount)
  fiatDeposit: FiatDeposit[];
}
