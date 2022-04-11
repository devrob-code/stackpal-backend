import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('phoneVerifications')
export class PhoneVerification {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('varchar')
  phone: string;

  @Column('varchar')
  code: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
