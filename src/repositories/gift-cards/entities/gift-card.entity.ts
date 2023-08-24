import { GiftCardDeposit } from 'src/repositories/gift-card-deposits/entities/gift-card-deposit.entity';
import { GiftCardReceipts } from 'src/repositories/gift-card-receipts/entities/gift-card-receipts.entity';
import { User } from 'src/repositories/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('giftCards')
export class GiftCard {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('int')
  adminId: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  imageUrl: string;

  @Column('varchar')
  denominationRange: string;

  @Column('varchar')
  country: string;

  @Column('int')
  physicalFastRate: number;

  @Column('int')
  physicalSlowRate: number;

  @Column('int')
  ecodeFastRate: number;

  @Column('int')
  ecodeSlowRate: number;

  @Column('varchar')
  receiptType: string;

  @Column('varchar')
  receiptImageUrl: string;

  @Column('boolean')
  isActive: boolean;

  @Column('varchar')
  countryFlag: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.giftCard)
  @JoinColumn({ name: 'adminId', referencedColumnName: 'id' })
  user: User[];

  @OneToMany(() => GiftCardReceipts, (giftCardReceipts) => giftCardReceipts.giftCard)
  giftCardReceipts: GiftCardReceipts[];

  @OneToMany(() => GiftCardDeposit, (giftCardDeposit) => giftCardDeposit.giftCard)
  giftCardDeposits: GiftCard[];
}
