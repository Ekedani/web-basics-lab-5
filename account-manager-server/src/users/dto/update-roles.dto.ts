import { IsEnum } from 'class-validator';
import { Role } from '../../shared/enums/role.enum';

export class UpdateRolesDto {
  @IsEnum(Role, { each: true })
  roles: Role[];
}
