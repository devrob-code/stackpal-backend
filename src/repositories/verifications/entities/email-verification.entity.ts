import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('emailVerifications')
export class EmailVerification {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('varchar')
  email: string;

  @Column('varchar')
  code: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
