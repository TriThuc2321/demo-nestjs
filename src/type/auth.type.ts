import type { ACCESS_TOKEN_COOKIE_NAME } from '@/constants/auth';

export enum PermissionAction {
  View = 'view',
  Create = 'create',
  Update = 'update',
  Delete = 'delete',
}

export enum ObjectName {
  user = 'user',
  role = 'role',
  permission = 'permission',
  s3 = 's3',
}

export enum RoleEnum {
  ADMIN = '1',
  USER = '2',
}

export enum ProviderEnum {
  LOCAL = 'local',
  GOOGLE = 'google',
  LINKEDIN = 'linkedin',
}

export interface ITokenPayload {
  email: string;
  roleId: RoleEnum;
  id: number;
  permissions: Array<{ action: PermissionAction; object: ObjectName }>;
}

export interface IThirdPartyLoginUser {
  email: string;
  name: string;
  accessToken: string;
}

export interface IGoogleAuth {
  name: {
    givenName: string;
    familyName: string;
  };
  emails: [{ value: string }];
}

export interface ILinkedInAuth {
  email: string;
  familyName: string;
  givenName: string;
}

export interface IRequestWithUser extends Request {
  user: ITokenPayload;
}

export interface IRequestWithCookies extends Request {
  cookies: {
    [ACCESS_TOKEN_COOKIE_NAME]: string;
  };
}
