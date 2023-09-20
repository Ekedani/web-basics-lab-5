import { SetPasswordDto } from './set-password.dto';

export class UpdatePasswordDto extends SetPasswordDto {
  oldPassword: string;
}
