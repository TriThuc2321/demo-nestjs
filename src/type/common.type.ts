export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface ISuccessMessage<T> {
  statusCode?: number;
  message?: string;
  data?: T;
}
