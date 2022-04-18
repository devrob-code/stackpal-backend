import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('currencies')
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  alias: string;

  @Column('varchar')
  logo: string;

  @Column('bigint')
  price: string;

  @Column('boolean')
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
