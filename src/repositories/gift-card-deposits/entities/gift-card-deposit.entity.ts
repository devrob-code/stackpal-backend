import { GiftCardDepositType } from 'src/customer/gift-cards/gift-card.constants';
import { GiftCard } from 'src/repositories/gift-cards/entities/gift-card.entity';
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

@Entity('giftCardDeposits')
export class GiftCardDeposit {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('int')
  userId: number;

  @Column({ type: 'enum', enum: GiftCardDepositType })
  type: GiftCardDepositType;

  @Column('varchar')
  denomination: string;

  @Column('boolean')
  isApproved: boolean;

  @Column('int')
  approvedBy: number;

  @Column('int')
  approvalRate: number;

  @Column('boolean')
  isCredited: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column('varchar')
  cardImageUrl: string;

  @Column('varchar')
  code: string;

  @Column('varchar')
  cardName: string;

  @Column('int')
  cardWorth: number;

  @Column('int')
  giftCardId: number;

  @Column('varchar')
  speed: string;

  @Column('int')
  rate: number;

  @ManyToOne(() => User, (user) => user.giftCard)
  @JoinColumn({ name: 'approvedBy', referencedColumnName: 'id' })
  user: User[];

  @ManyToOne(() => GiftCard, (giftCard) => giftCard.giftCardDeposits)
  giftCard: GiftCard[];
}
