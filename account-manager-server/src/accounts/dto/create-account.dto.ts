import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty({ message: 'Service cannot be empty' })
  @IsString({ message: 'Service must be a string' })
  service: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Username cannot be empty' })
  @IsString({ message: 'Username must be a string' })
  username?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail({}, { message: 'Invalid email format' })
  email?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Phone cannot be empty' })
  @IsPhoneNumber(null, { message: 'Invalid phone number format' })
  phone?: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}
