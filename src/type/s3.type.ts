export interface IGetS3PresignedPayload {
  fileName: string;
  privatePath: string | null;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export enum S3_PATH {
  USER_AVATAR = 'user-avatar',
  SCHOOL_THUMBNAIL = 'school-thumbnail',
}
