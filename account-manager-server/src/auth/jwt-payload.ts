import { Role } from '../shared/enums/role.enum';

export interface JwtPayload {
  sub: string;
  username: string;
  roles: Role[];
}
