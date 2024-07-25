import { IsEmail } from 'class-validator';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Role } from '@/entities';

@Index('users_pkey', ['id'], { unique: true })
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id!: number;

  @IsEmail()
  @Column({
    name: 'email',
    length: 255,
  })
  email!: string;

  @Column({
    name: 'name',
    nullable: true,
    length: 255,
  })
  name?: string;

  @Column('character varying', {
    name: 'password',
    nullable: true,
    length: 255,
  })
  password?: string;

  @Column('bigint', { name: 'role_id', nullable: true })
  roleId?: string;

  @Column({
    name: 'provider',
    nullable: true,
    length: 255,
    default: () => "'local'",
  })
  provider?: string;

  @ManyToOne(() => Role, (roles) => roles.users)
  @JoinColumn([{ name: 'role_id', referencedColumnName: 'id' }])
  role!: Role;

  @Column('time without time zone', {
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;
}
