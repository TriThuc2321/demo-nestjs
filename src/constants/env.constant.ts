import { config } from 'dotenv';

config();

export const CORS_CONFIGURE = process.env.CORS_CONFIGURE;
export const APP_PORT = process.env.APP_PORT;

export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
export const AWS_REGION = process.env.AWS_REGION;
export const AWS_BUCKET = process.env.AWS_BUCKET;

export const DATABASE_HOST = process.env.DATABASE_HOST;
export const DATABASE_PORT = Number(process.env.DATABASE_PORT);
export const DATABASE_UID = process.env.DATABASE_UID;
export const DATABASE_PWD = process.env.DATABASE_PWD;
export const DATABASE_NAME = process.env.DATABASE_NAME;
// eslint-disable-next-line @typescript-eslint/naming-convention
export const DATABASE_SYNC = process.env.DATABASE_SYNC === 'true';

export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_ACCESS_TOKEN_EXPIRATION_TIME =
  process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME;

export const SESSION_SECRET = process.env.SESSION_SECRET;
