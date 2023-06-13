import { BankTypesEnum } from 'src/customer/banks/banks.constants';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('bankAccounts')
export class BankAccounts {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('int')
  userId: number;

  @Column('varchar')
  bankName: string;

  @Column('varchar')
  accountName: string;

  @Column('varchar')
  accountNumber: string;

  @Column({ type: 'enum', enum: BankTypesEnum })
  type: BankTypesEnum;

  @Column('boolean')
  isDeleted: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
