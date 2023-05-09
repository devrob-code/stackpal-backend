import { User } from 'src/repositories/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('electricityTransactions')
export class ElectricityTransactions {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('varchar')
  txId: string;

  @Column('int')
  userId: number;

  @Column('bigint')
  amount: number;

  @Column('varchar')
  network: string;

  @Column('text')
  plan: string;

  @Column('varchar')
  recipient: string;

  @Column('varchar')
  billerTxId: string;

  @Column('varchar')
  status: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.electricityTransactions)
  user: User;
}
