import * as bcrypt from 'bcrypt';

import type { ISuccessMessage } from '@/type/common.type';

export const SUCCESS_MESSAGE = <T>({
  statusCode = 200,
  message = 'Success',
  data,
}: ISuccessMessage<T>): ISuccessMessage<T> => ({
  statusCode,
  message,
  data,
});

export const hashPassword = (password: string): Promise<string> =>
  bcrypt.hash(password, 12);

interface IComparePasswords {
  password: string;
  hashedPassword: string;
}
export const comparePasswords = ({
  password,
  hashedPassword,
}: IComparePasswords): Promise<boolean> =>
  bcrypt.compare(password, hashedPassword);
