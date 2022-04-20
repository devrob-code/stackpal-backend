import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRoles } from 'src/user/user.constants';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('varchar')
  email: string;

  @Column('varchar')
  password: string;
  @BeforeInsert() async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @Column('varchar')
  phone: string;

  @Column('varchar')
  username: string;

  @Column('varchar')
  firstName: string;

  @Column('varchar')
  lastName: string;

  @Column('boolean')
  emailVerified: boolean;

  @Column('boolean')
  phoneVerified: boolean;

  @Column({ type: 'enum', enum: UserRoles })
  role: UserRoles;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
