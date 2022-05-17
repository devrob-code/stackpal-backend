import { CurrencyTypes } from 'src/customer/currency/currency.constants';
import { Wallet } from 'src/repositories/wallets/entities/wallet.entity';
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

@Entity('currencies')
export class Currency {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  alias: string;

  @Column('varchar')
  logo: string;

  @Column('bigint')
  price: string;

  @Column('boolean')
  isActive: boolean;

  @Column({ type: 'enum', enum: CurrencyTypes })
  type: CurrencyTypes;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => Wallet, (wallet) => wallet.currency)
  wallet: Wallet[];
}
