import { User } from 'src/repositories/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('giftCards')
export class GiftCard {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('int')
  userId: number;

  @Column('varchar')
  cardNo: string;

  @Column('varchar')
  imageUrl: string;

  @Column('boolean')
  isApproved: boolean;

  @Column('int')
  approvedBy: number;

  @Column('int')
  rate: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.giftCard)
  user: User[];
}
