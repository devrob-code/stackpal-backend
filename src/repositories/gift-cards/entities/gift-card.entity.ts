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
  adminId: number;

  @Column('varchar')
  cardType: string;

  @Column('varchar')
  imageUrl: string;

  @Column('bigint')
  physicalRate: number;

  @Column('bigint')
  eCodeRate: number;

  @Column('int')
  denomination: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.giftCard)
  user: User[];
}
