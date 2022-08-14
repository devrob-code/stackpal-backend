import { GiftCardDepositType } from 'src/customer/gift-cards/gift-card.constants';
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
export class GiftCard {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('int')
  userId: number;

  @Column({ type: 'enum', enum: GiftCardDepositType })
  type: GiftCardDepositType;

  @Column('bigint')
  denomination: number;

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

  @ManyToOne(() => User, (user) => user.giftCard)
  @JoinColumn({ name: 'approvedBy', referencedColumnName: 'id' })
  user: User[];
}
