import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Permission, Role } from '@/entities';

@Index('permission_roles_pkey', ['id'], { unique: true })
@Entity('permissions_roles', { schema: 'public' })
export class PermissionRole {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id!: string;

  @ManyToOne(() => Permission, (permissions) => permissions.permissionRoles)
  @JoinColumn([{ name: 'permission_id', referencedColumnName: 'id' }])
  permission!: Permission;

  @Column('bigint', { name: 'permission_id', nullable: true })
  permissionId!: string;

  @ManyToOne(() => Role, (roles) => roles.permissionRoles)
  @JoinColumn([{ name: 'role_id', referencedColumnName: 'id' }])
  role!: Role;

  @Column('bigint', { name: 'role_id', nullable: true })
  roleId!: string;
}
