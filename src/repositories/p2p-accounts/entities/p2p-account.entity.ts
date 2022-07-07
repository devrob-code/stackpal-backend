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

@Entity('p2pAccounts')
export class P2PAccount {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('int')
  createdBy: number;

  @Column('varchar')
  accountName: string;

  @Column('varchar')
  accountNumber: string;

  @Column('varchar')
  bankName: string;

  @Column('boolean')
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.p2pAccounts)
  @JoinColumn({ name: 'createdBy', referencedColumnName: 'id' })
  user: User;
}
