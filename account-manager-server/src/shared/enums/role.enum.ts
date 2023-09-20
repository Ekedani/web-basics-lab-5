import { RolesBuilder } from 'nest-access-control';

export enum Role {
  User = 'user',
  Admin = 'admin',
}

export const appRoles: RolesBuilder = new RolesBuilder();
appRoles
  .grant(Role.User)
  .readOwn('users')
  .updateOwn('users')
  .deleteOwn('users');
appRoles
  .grant(Role.Admin)
  .extend(Role.User)
  .readAny('users')
  .updateAny('users')
  .deleteAny('users');
