import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { PermissionRole } from '@/entities';

@Index('permissions_pkey', ['id'], { unique: true })
@Entity('permissions', { schema: 'public' })
export class Permission {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id!: string;

  @Column('character varying', { name: 'action', nullable: true, length: 255 })
  action!: string;

  @Column('character varying', { name: 'object', nullable: true, length: 255 })
  object!: string;

  @Column('boolean', { name: 'is_active', nullable: true })
  isActive?: boolean;

  @Column('timestamp without time zone', { name: 'created_at', nullable: true })
  createdAt?: Date;

  @Column('timestamp without time zone', { name: 'updated_at', nullable: true })
  updatedAt?: Date;

  @Column('timestamp without time zone', { name: 'deleted_at', nullable: true })
  deletedAt?: Date;

  @OneToMany(
    () => PermissionRole,
    (permissionRoles) => permissionRoles.permission,
  )
  permissionRoles?: PermissionRole[];
}
