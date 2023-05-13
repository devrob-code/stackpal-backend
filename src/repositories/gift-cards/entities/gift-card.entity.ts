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
}
