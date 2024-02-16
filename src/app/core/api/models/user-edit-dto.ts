/* tslint:disable */
/* eslint-disable */
export interface UserEditDto {
  active?: boolean;
  createdAT?: string;
  email?: string;
  firstName?: string;
  id?: number;
  lastName?: string;
  oldPassword?: string;
  password?: string;
  role?: 'USER' | 'ADMIN';
}
