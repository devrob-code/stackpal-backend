import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('p2pAccounts')
export class Currency {
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
}
