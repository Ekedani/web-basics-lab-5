import { Injectable } from '@nestjs/common';
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  login(loginDto: LoginDto) {
  }

  register(registerDto: RegisterDto) {

  }
}
