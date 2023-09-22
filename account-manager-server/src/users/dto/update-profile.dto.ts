import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";

export class UpdateProfileDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Username cannot be empty' })
  @IsString({ message: 'Username must be a string' })
  username?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Phone cannot be empty' })
  @IsString({ message: 'Phone must be a string' })
  @Matches(/^\+\d{1,4}\s?\d{1,14}$/, { message: 'Invalid phone number' })
  phone?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail({}, { message: 'Invalid email format' })
  email?: string;
}
