/**
 * @description User-Service parameters
 */
import { User } from './entity/user';

export enum ResponseCode {
  SUCCESS = 200,
  ERROR = 500,
}

export interface IGetUserOptions {
  id: number;
}

export interface ICreateUserOptions {
  name?: string;
  address?: string;
  description?: string;
}

export interface IUpdateUserOptions
  extends ICreateUserOptions,
    IGetUserOptions {}

export interface IGetUserResponse {
  code: ResponseCode;
  message: string;
  data: User | null;
}
