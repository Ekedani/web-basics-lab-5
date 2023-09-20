import { Role } from '../enums/role.enum';

export interface RequestUser {
  id: string;
  username: string;
  roles: Role[];
}
