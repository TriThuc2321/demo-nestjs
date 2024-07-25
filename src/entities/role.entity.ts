import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { PermissionRole, User } from '@/entities';

@Index('roles_pkey', ['id'], { unique: true })
@Entity('roles', { schema: 'public' })
export class Role {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id!: string;

  @Column('character varying', { name: 'name', nullable: true, length: 255 })
  name?: string | null;

  @Column('boolean', { name: 'is_active', nullable: true, default: true })
  isActive?: boolean | null;

  @Column('timestamp without time zone', { name: 'created_at', nullable: true })
  createdAt?: Date | null;

  @OneToMany(() => PermissionRole, (permissionRoles) => permissionRoles.role, {
    cascade: ['insert', 'update'],
  })
  permissionRoles?: PermissionRole[];

  @OneToMany(() => User, (users) => users.role)
  users?: User[];
}
